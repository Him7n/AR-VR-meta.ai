// https://lime-adjacent-gamefowl-120.mypinata.cloud/ipfs/

const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const JWT ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiNTg0Y2ZiMi02NDA0LTRiYWYtYmY5NC04OTdlZGVhNWVkOGUiLCJlbWFpbCI6ImhzMzgzMTc2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI3OGI5MWE0YjViMzM0MjhmODY4YSIsInNjb3BlZEtleVNlY3JldCI6ImNiMmYwMzQxYTNlY2E0MjkyYzNiNmIxM2ZkZjcyZjhjNWE2ODQxZTAzNDYxMTYwNmYxZGU0MDYwMzEzMzJjMjQiLCJpYXQiOjE3MTI0MzU2NjR9.AQFB8ETjuj81Rtag9zZLXsWH3Xb21AgGQRVTtLj181I";

const pinFileToIPFS = async (showid,myaddress) => {
  const formData = new FormData();
  const src = "./MYNFT.img";

  const file = fs.createReadStream(src);
  formData.append("file", file);

  const pinataMetadata = JSON.stringify({
    name: "File name",
  });
  formData.append("pinataMetadata", pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", pinataOptions);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${JWT}`,
        },
      }
    );
    console.log("File uploaded to IPFS:", res.data);

    const metadataObj = {
      BuyerAddress: "MY metamask address",
      createdAt: Date().toString(),
      ticketnumber: res.data.IpfsHash,
      imageAddress: `https://copper-gigantic-anaconda-230.mypinata.cloud/ipfs/${res.data.IpfsHash}`,
    };

    const metadata = JSON.stringify(metadataObj);

    try {
      const metadataRes = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        metadata,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT}`,
          },
        }
      );
      console.log("Metadata pinned to IPFS:", metadataRes.data);
    } catch (error) {
      console.error("Error pinning metadata to IPFS:", error.message, JSON.stringify(error));
    }
  } catch (error) {
    console.error("Error uploading file to IPFS:", error.message);
  }
};

pinFileToIPFS();
