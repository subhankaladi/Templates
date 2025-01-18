import { createClient } from '@sanity/client';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import slugify from 'slugify';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2021-08-31'
});

async function uploadImageToSanity(imageUrl) {
    try {
        console.log(`Uploading image: ${imageUrl}`);
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data);
        const asset = await client.assets.upload('image', buffer, {
            filename: imageUrl.split('/').pop()
        });
        console.log(`Image uploaded successfully: ${asset._id}`);
        return asset._id;
    } catch (error) {
        console.error('Failed to upload image:', imageUrl, error);
        return null;
    }
}

async function createCategory(category, counter) {
    try {
        const categoryExist = await client.fetch(`*[_type=="category" && slug.current==$slug][0]`, { slug: category.slug });
        if (categoryExist) {
            return categoryExist._id;
        }
        const catObj = {
            _type: "category",
            _id: `${category.slug}-${counter}`,
            name: category.name,
            slug: {
                _type: 'slug',
                current: slugify(category.name || 'default-category', { lower: true, strict: true })
            }
        };
        const response = await client.createOrReplace(catObj);
        console.log('Category created successfully', response);
        return response._id;
    } catch (error) {
        console.error('Failed to create category:', category.name, error);
        return null;
    }
}

async function importData() {
    try {
        console.log('Fetching products from API...');
        const response = await axios.get('https://hackathon-apis.vercel.app/api/products');
        const products = response.data;
        let counter = 1;

        for (const product of products) {
            console.log(`Processing product: ${product.name}`);
            let imageRef = null;
            let catRef = null;

            if (product.image) {
                imageRef = await uploadImageToSanity(product.image);
            }
            if (product.category?.name) {
                catRef = await createCategory(product.category, counter);
            }

            const sanityProduct = {
                _id: `product-${counter}`,
                _type: 'product',
                name: product.name,
                slug: {
                    _type: 'slug',
                    current: slugify(product.name, { lower: true, strict: true })
                },
                price: product.price,
                category: catRef ? {
                    _type: 'reference',
                    _ref: catRef
                } : undefined,
                tags: product.tags || [],
                quantity: 50,
                image: imageRef ? {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: imageRef
                    }
                } : undefined,
                description: product.description || "Default product description",
                features: product.features || ["Premium material", "Handmade upholstery"],
                dimensions: product.dimensions || {
                    _type: 'dimensions',
                    height: "110cm",
                    width: "75cm",
                    depth: "50cm"
                }
            };

            await client.createOrReplace(sanityProduct);
            console.log(`✅ Imported product: ${sanityProduct.name}`);
            counter++;
        }
        console.log('✅ Data import completed!');
    } catch (error) {
        console.error('Error importing data:', error);
    }
}

importData();
