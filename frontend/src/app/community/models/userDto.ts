import { PostDto } from './postDto';

export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  role: string; // Example: "ROLE_USER {read, edit}, ROLE_ADMIN {delete}"

  profileImageUrl: string;
}
