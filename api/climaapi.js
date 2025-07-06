'use server'
import axios from "axios";
import { config, validateConfig } from "@/config/env";

export default async function getClima(){
    try {
        validateConfig();
        
        const clima = await axios.get(
            `${config.weather.baseUrl}/current.json?key=${config.weather.apiKey}&q=Venâncio&lang=pt`
        );
        return clima.data.current;
    } catch (error) {
        console.error('Erro ao obter dados do clima:', error.message);
        throw new Error('Não foi possível obter dados do clima. Tente novamente mais tarde.');
    }
}
