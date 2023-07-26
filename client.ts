import createClient from '@sanity/client';

export default createClient({
    projectId: process.env.SANITY_PROJECT_ID, // you can find this in sanity.json
    dataset: process.env.SANITY_DATASET, // or the name you chose in step 1
    useCdn: false // `false` if you want to ensure fresh data
})