interface ParsedImageUrls {
  imageUrlList: string[];
  imagelessString: string;
}

export default function parseImageUrls(string: string): ParsedImageUrls {
  const imageUrlRegex =
    /(?:https?:\/\/)?(?:www\.)?\S+\.(?:jpg|jpeg|png|gif|bmp)/gi;

  const imageUrlList = string.match(imageUrlRegex);

  if (!imageUrlList) return { imageUrlList: [], imagelessString: string };

  const imagelessString = imageUrlList.reduce(
    (string, imgUrl) => string.replace(imgUrl, ''),
    string
  );

  return { imageUrlList, imagelessString };
}
