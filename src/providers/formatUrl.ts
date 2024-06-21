export default async function formatUrl (filename:string)  {
    // Define the base URL
    const baseUrl = "https://s3-eu-west-1.amazonaws.com/images.rightplants/";
    
    // Replace spaces with '%20'
    const formattedFilename = filename.replace(/ /g, "%20");
    
    // Concatenate base URL and formatted filename
    const fullUrl = `${baseUrl}${formattedFilename}`;
    
    return fullUrl;
  };