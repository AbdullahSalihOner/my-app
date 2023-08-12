import axios from "axios";

export class WishListService {
  getWishList(UserId) {
    return axios.get("http://localhost:8080/wishlist/{UserId}?UserId=" + UserId);
  } 

  addWishList(ProductDto, UserId) {
    return axios.post(
      "http://localhost:8080/wishlist/add?UserId=" + UserId,
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
  deleteWishList(wishListId, UserId) {
    return axios.delete(
      "http://localhost:8080/wishlist/delete/" + wishListId + "?UserId=" + UserId
    );
  }
}

export default WishListService;
