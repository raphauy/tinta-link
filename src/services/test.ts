import { getImageUrlFromAPI } from "./userService"

async function main() {
    console.log("Testing API...")
    
    const nick= "raphauy"
    const imageUrl= await getImageUrlFromAPI(nick)
    console.log("imageUrl: ", imageUrl)
    
  }
  
main()
.catch((e) => {
    console.error(e)
    process.exit(1)
})
.finally(async () => {
    console.log("Test finished")
    
})
  