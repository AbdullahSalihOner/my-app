import axios from "axios";

export class WishListService {
  getWishList(token) {
    return axios.get("http://localhost:8080/wishlist/" + token);
  } //Çağırdığım yerde localdeki tokenı gönderiyorum

  addWishList(ProductDto, token) {
    return axios.post(
      "http://localhost:8080/wishlist/add" + "?token=" + token,
      {
        categoryId: ProductDto.categoryId,
        description: ProductDto.description,
        id: ProductDto.id,
        imageURL: ProductDto.imageURL,
        name: ProductDto.name,
        price: ProductDto.price,
      }
    );
  }
  deleteWishList(id, token) {
    return axios.delete(
      "http://localhost:8080/wishlist/delete/" + id + "?token=" + token
    );
  }
}

export default WishListService;
