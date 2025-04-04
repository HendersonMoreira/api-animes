import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const animes = [
  {
    id: 1,
    titulo: "Cyberpunk: Edgerunners",
    episodios: 10,
    categoria: "ação",
    videoUrl: "https://www.youtube.com/watch?v=_AB8wI2fyos&list=PLpu1dwehr9uDT0uBGO79bIUPNyjyD7bPG"
  }
];

// Rota raiz
app.get('/', (req, res) => {
  res.json({ message: 'API de Animes funcionando!' });
});

// Rota para listar todos os animes
app.get('/api/animes', (req, res) => {
  try {
    if (req.query.id) {
      const anime = animes.find(a => a.id === parseInt(req.query.id));
      if (anime) {
        return res.status(200).json(anime);
      } else {
        return res.status(404).json({ message: "Anime não encontrado" });
      }
    }
    return res.status(200).json(animes);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Rota para buscar anime por ID
app.get('/api/animes/:id', (req, res) => {
  try {
    const anime = animes.find(a => a.id === parseInt(req.params.id));
    if (anime) {
      return res.status(200).json(anime);
    } else {
      return res.status(404).json({ message: "Anime não encontrado" });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erro interno do servidor" });
});

export default app;