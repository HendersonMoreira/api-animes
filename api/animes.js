export default function handler(req, res) {
    const animes = [
      {
        id: 1,
        titulo: "Cyberpunk: Edgerunners",
        episodios: 10,
        categoria: "ação",
        videoUrl: "https://www.youtube.com/watch?v=_AB8wI2fyos&list=PLpu1dwehr9uDT0uBGO79bIUPNyjyD7bPG"
      }
    ];
  
    if (req.method === "GET") {
      if (req.query.id) {
        const anime = animes.find(a => a.id === parseInt(req.query.id));
        if (anime) {
          return res.status(200).json(anime);
        } else {
          return res.status(404).json({ message: "Anime não encontrado" });
        }
      }
      return res.status(200).json(animes);
    }
  
    res.status(405).json({ message: "Método não permitido" });
  }
  