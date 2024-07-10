// api.ts
import { Elysia } from 'elysia';
import Content from '../db/index';
import { Schema, model, connect } from 'mongoose';

const app = new Elysia();

app.get('/', async (req: any, res: any) => {

    try {
        await connect("mongodb+srv://sumon:sumon1234@seyaha.pzour3n.mongodb.net/ProductList?retryWrites=true&w=majority&appName=seyaha");
        const content = await Content.find({})

        if (!content) {
          return res.status(404).json({ message: "Content not found" })
        }
    
        res.status(200).json(content)

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching data' });
    }
});

export default app;
