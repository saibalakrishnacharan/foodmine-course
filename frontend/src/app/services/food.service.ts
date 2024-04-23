import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { sample_foods, sample_tags } from 'src/data';
import { FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL, FOOD_BY_ID_URL } from '../shared/constants/urls';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }
  foodSamples: Food[] = [
    {
      id: "1",
      name: "Spaghetti Carbonara",
      price: 10.99,
      tags: ["Italian", "Pasta"],
      favorite: true,
      stars: 4.5,
      imageUrl: "https://picsum.photos/200/300",
      origins: ["Italy"],
      cookTime: "30 minutes"
    },
    {
      id: "2",
      name: "Sushi",
      price: 15.50,
      tags: ["Japanese", "Seafood", "Rice"],
      favorite: false,
      stars: 4.8,
      imageUrl: "https://source.unsplash.com/random/200x300",
      origins: ["Japan"],
      cookTime: "45 minutes"
    },
    {
      id: "3",
      name: "Tacos",
      price: 8.99,
      tags: ["Mexican", "Street Food"],
      favorite: true,
      stars: 4.2,
      imageUrl: "https://picsum.photos/200/300",
      origins: ["Mexico"],
      cookTime: "20 minutes"
    }
  ];
  getAll(): Observable<Food[]> {
    
    
    console.log(this.foodSamples);
    return of(this.foodSamples)
    return this.http.get<Food[]>(FOODS_URL);
  }

  getAllFoodsBySearchTerm(searchTerm: string) {
    let items  = this.foodSamples.filter((item :any)=> item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    return of(items);
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }

  getAllTags(): Observable<Tag[]> {
    let tags :Tag [] = [{name : 'All'}];
    this.foodSamples.forEach((item: any) => {
      item.tags.forEach((element: any) => {
        let index = tags.findIndex((item : any)=> item.name === element)
        if(index < 0){
          tags.push({name : element})
        }
          
      });
  });
  console.log("tage",tags)
    return of(tags)
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }

  getAllFoodsByTag(tag: string): Observable<Food[]> {
    return tag === "All" ?
      this.getAll() : of(this.foodSamples.filter((item :any)=> item.tags.includes(tag)))
      this.http.get<Food[]>(FOODS_BY_TAG_URL + tag);
  }

  getFoodById(foodId:string):Observable<Food>{
    let item  = this.foodSamples.findIndex((item :any)=> item.id === foodId)
    return of(this.foodSamples[item]);
    return this.http.get<Food>(FOOD_BY_ID_URL + foodId);
  }

}
