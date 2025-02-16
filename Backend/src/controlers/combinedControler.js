import axios from 'axios';

export const getCombinedData = async (req, res) => {
    const { month, year } = req.query;

    if (!month || isNaN(month) || month < 1 || month > 12) {
        return res.status(400).json({ message: 'Please provide a valid month (1-12).' });
    }

    try {
      
        const baseURL = `http://localhost:3000/api/v1`;
        const statisticsURL = `${baseURL}/statistics?month=${month}&year=${year}`;
        const barChartURL = `${baseURL}/bar-chart?month=${month}`;
        const pieChartURL = `${baseURL}/pie-chart?month=${month}`;

        
        const [statisticsResponse, barChartResponse, pieChartResponse] = await Promise.all([
            axios.get(statisticsURL),
            axios.get(barChartURL),
            axios.get(pieChartURL),
        ]);

        // Combine the responses into a single object
        const combinedData = {
            statistics: statisticsResponse.data,
            barChart: barChartResponse.data,
            pieChart: pieChartResponse.data
        };

        // Send the combined data as the response
        res.json(combinedData);
    } catch (error) {
        console.error('Error fetching combined data:', error);
        res.status(500).json({ message: 'Error fetching combined data.' });
    }
};