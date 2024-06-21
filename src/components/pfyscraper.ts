import AxiosService from "../providers/axios_provider.js";
import PuppeteerScrapper from "../providers/puppeteer_scraper.js";
import DownloadImage from "../providers/downloadimage.js";

const api = new AxiosService(
  "https://api-gateway.prod.rightplants4me.co.uk/api"
);



export default class PFYScraper extends PuppeteerScrapper {
  constructor() {
    super(false, { headless: false, args: ["--no-sandbox"] });
  }

  async $extract(): Promise<void> {
    if (this.$page === null) {
      console.log("browser tab is not up yet ... ");
      return;
    } else {
      for (var i = 1; i <= 10; i++) {
        // let data = await api.get("/plants/1");
        // console.log(data.data);

        //await this.navigate();
        await this.$page.goto(`https://www.rightplants4me.co.uk/plant/${i}`, {
          timeout: 0,
          waitUntil: "networkidle0",
        });
        console.log("hell");

        let exists = await this.exists("div.main.main-raised.main-product");

        
        while(true){ 
       
            let sed: Set<string> = new Set();
            const imgLinks = await this.$page
              .evaluate(() => {
                return Array.from(
                  document
                    .querySelector("div.main.main-raised.main-product")
                    ?.querySelectorAll("img")!
                ).map((item) => {
                  return (item as HTMLImageElement).src;
                });
              })
              .then((arra) => {
                arra.map((link) => {
                  sed.add(link);
                });
              });
  
            let indexd = 0;
            for (const link of sed) {
              console.log(link);
              await DownloadImage(link, `downloaded_image_${indexd}.jpg`);
              indexd++;
            }
            break
        
        }
       
      }
    }
  }
}

await new PFYScraper().exec();

//await downloadImage("https://s3-eu-west-1.amazonaws.com/images.rightplants/Magnolia%20stellata%20'Jane%20Platt'~cu%20flower.jpg",'image_download.jpg')
