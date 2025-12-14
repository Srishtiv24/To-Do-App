import express from "express";
import { OpenRouter } from "@openrouter/sdk";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import path from "path";//in es module - dirname has to be defined
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());//json body read to req.body
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>
{
  res.redirect("/toDo");
});

app.get("/toDo",(req,res)=>
{
  res.sendFile(path.join(__dirname,"public","toDoList.html"))
});

const openrouter = new OpenRouter({
  apiKey: process.env.API_KEY, // set in your environment
});

app.post("/cat",async (req,res)=>{
  try{
  const {text}=req.body;
  const response = await openrouter.chat.send({
    model: "anthropic/claude-3-haiku",
    messages: [
        { role: "system", content: `You are a strict task categorizer.
Reply ONLY with ONE word from this list: Work, Basic, Skill, Personal, Study, Errands.
Do not add punctuation, sentences, or explanations.

Examples:
Task: "college" ,"school" → Work
Task: "Brush teeth" or "sleep" or "eat"  → Basic
Task: "Learn JavaScript","web development" → Skill
Task: "Call mom" ,"skin care" → Personal
Task: "Revise graph algorithms","end sem" → Study
Task: "Buy groceries" → Errands`
},
        { role: "user", content: `Categorize this task: "${text}"` }
        ],
  });

  console.log("AI Category:", response.choices[0].message.content);
  res.json({category:response.choices[0].message.content});
}
catch(err)
{
   console.error("Error:", err);
    res.status(500).json({ error: "Something went wrong" });
}
})

app.listen(3000, () => console.log("Server running on port 3000"));

