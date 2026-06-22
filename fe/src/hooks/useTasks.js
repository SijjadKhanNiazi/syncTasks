import { useQuery } from "@tanstack/react-query";

const API_URL = "http://localhost:5000/api/tasks";

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
};

//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//#endregionds
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//#endregionds
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//#endregionds
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//#endregionds
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//#endregionds
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//#endregionds
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//#endregionds
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//#endregionds
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//#endregionds
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//#endregionds
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//#endregionds
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//#endregionds
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//#endregionds
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//#endregionds
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//#endregionds
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//#endregionds
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//#endregionds
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//##kjdnksdjnsdkkdjfnskdjfnskdjffsdnjfsdkfjdsnfjsdnfjsdn
//#endregionds
