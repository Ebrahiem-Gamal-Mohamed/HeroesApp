import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemHeroService implements InMemoryDbService {
  createDb() {
    let heroes = [
      {
        id: 1,
        fullName: "Ahmed Mohammed",
        powers: "Angular, React and NodeJs",
        profileImage:
          "https://lh3.googleusercontent.com/proxy/rIywYjJ3weGtPN8Tvej_ROCfKvjXwCUeQj_yHnwfeKZixhUBaUDyIq8zbsVyhbinJVpvUom0XCxFHQ-9jFK70w37CkJjSQfJ-P-Rg7OWyGB7Umw5iJmXVEo",
        description: "Beutiful",
        rate: 2
      },
      {
        id: 2,
        fullName: "Mohammed Ahmed",
        powers: "PHP, Laravel & MySQL",
        profileImage: "",
        description: "Perfect",
        rate: 3
      },
      {
        id: 3,
        fullName: "Ebrahiem Mohammed",
        powers: "Angular, NodeJs, Mongodb & Vue",
        profileImage:
          "https://torange.biz/photofx/19/8/image-profile-picture-beautiful-flowers-sunflower-19228.jpg",
        description: "Beutiful",
        rate: 5
      },
      {
        id: 4,
        fullName: "Ahmed Ezz",
        powers: "DotNet, C# and Java",
        profileImage:
          "https://image.freepik.com/free-photo/beautiful-profile-kestrel_58409-12462.jpg",
        description: "Awesome",
        rate: 4
      }
    ];
    return { heroes };
  }
}
