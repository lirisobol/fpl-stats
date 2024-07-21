import express from 'express';
import axios from 'axios';
import cors from 'cors';

class App {
  private server = express();

  public async start(): Promise<void> {
    this.server.use(cors()); // Enable CORS for any frontend website
    this.server.use(express.json());

    // Define the API endpoint
    this.server.get('/api/general-information', async (req, res) => {
      try {
        const response = await axios.get('https://fantasy.premierleague.com/api/bootstrap-static/');
        res.json(response.data);
      } catch (error) {
        res.status(500).send('Error fetching data');
      }
    });

    // Start the server
    this.server.listen(3001, () => {
      console.log('Server is running on http://localhost:3001');
    });
  }
}

const app = new App();
app.start();
