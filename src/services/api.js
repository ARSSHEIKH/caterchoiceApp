/**
 * @format
 */
 import axios from "axios";
 
 export default class Api {
   _api = null;
 
   static init = ({ url }) => {
     try {
       this._api = axios.create({
         baseURL: url,
         timeout: 10000,
       });
     } catch (error) {
       return error;
     }
   };
 
   static setClientToken = async (token) => {
     this._api.interceptors.request.use(function (config) {
       config.headers.Authorization = `Bearer ${token}`;
       return config;
     });
   };
 
   /*************** Fan API  ******************/
 
   static login = async (data) => {
     try {
       const response = await this._api.post("/login", data);
       return response;
     } catch (error) {
       return error.response;
     }
   };
 
   static signup = async (data) => {
     try {
       const response = await this._api.post("/signup", data);
       return response;
     } catch (error) {
       return error.response;
     }
   };

   static categories = async () => {
    try {
      const response = await this._api.get("/categories");
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static wishlist = async (token) => {
    try {
      const response = await this._api.get("/wishlist", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      return response;
    } catch (error) {
      return error.response;
    }
  };


  static setWishItem = async (token, slug) => {
    try {
      const response = await  this._api.get("/add-wishlist/" + slug, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      console.log("response", response);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static product = async (page, query) => {
    let params = { page: page };
    if (query && Object.keys(query).length > 0) {
      Object.keys(query).map((value) => {
        if (query[value]) {
          params[value] = query[value];
        }
      });
    }

    try {
      const response = await this._api.get("/product", {params:params});
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static productPromotions = async (page, query) => {
    let params = { page: page };

    try {
      const response = await axios.get("https://cater-choice.com/api"+"/product/product-promotions", {params:params, headers:{
        "Authorization":"Bearer 60|y02g3zujf5iipKOhGcc7gVzVm5eNlOUpp3AbB4E8"
      }});
      return response;
    } catch (error) {
      return error.response;
    }
  };


  static order = async (page, query) => {
    let params = { page: page };
    if (Object.keys(query).length > 0) {
      Object.keys(query).map((value) => {
        if (query[value]) {
          params[value] = query[value];
        }
      });
    }

    try {
      const response = await this._api.get("/order", {params:params});
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static slots = async (query) => {
    let params = {};
    if (Object.keys(query).length > 0) {
      Object.keys(query).map((value) => {
        if (query[value]) {
          params[value] = query[value];
        }
      });
    }

    try {
      const response = await this._api.get("/order/slots", {params:params});
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static submitOrder = async (query) => {
    try {
      const response = await this._api.post("/order", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static banner = async () => {

    try {
      const response = await this._api.get("/banners");
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchWarehouse = async (page, query) => {
    let params = { page: page };
    if (Object.keys(query).length > 0) {
      Object.keys(query).map((value) => {
        if (query[value]) {
          params[value] = query[value];
        }
      });
    }

    try {
      const response = await this._api.get("/warehouses", {params:params});
      return response;
    } catch (error) {
      return error.response;
    }
  };
 
 }
 