import React, { useEffect, useState } from "react";

const DogsApi = () => {

const [dogBreeds, setDogBreeds] = useState([])


useEffect(()=>{


},[])

const readDogBreeds = async () => {

    try {
        const res = await fetch("https://dog.ceo/api/breeds/list/all");
      const data = await res.json();

      const breedList = Object.keys(data.message);
      setDogBreeds(breedList);
    }



}


    return(<h1>hola</h1>)
}

export default DogsApi