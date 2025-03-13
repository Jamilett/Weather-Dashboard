// TODO: Define a City class with name and id properties
import fs from 'fs-extra';

class City {
  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name,
    this.id = id
  }
}
// TODO: Complete the HistoryService class
class HistoryService {

  private db_path: string = './db/db.json';

  async readCity(): Promise<City[]> {
    try {
      let data = await fs.readJSONSync(this.db_path);
      return data as City[];
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async writeCity(cities: City[]): Promise<void> {
    try {
      await fs.writeJson(this.db_path, cities);
    } catch (error) {
      return console.log(error);
    }
  }
  async getCities(): Promise<City[]> {
    return this.readCity();
  }

  async addCity(city: string) {
    try {
      let cityArray = await this.getCities();
      let newCity = new City(city, `${Date.now()}`);
      cityArray.push(newCity);
      await this.writeCity(cityArray);
    } catch (error) {
      return console.log(error);
    }
  }

  async removeCity(id: string) {
    try {
      const cities = await this.getCities();

      const updatedCities = cities.filter(city => city.id !== id);

      await this.writeCity(updatedCities);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new HistoryService();
