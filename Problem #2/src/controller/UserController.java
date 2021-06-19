package controller;

import application.Database;
import models.User;
import util.FileController;

public class UserController {
	
	public static void addUserToLocation(User user, int location_id) throws Exception {
		user.setLocation_id(location_id);
		FileController.saveUserDatabase();
	}
	
	public static void removeUserFromLocation(User user) throws Exception {
		user.setLocation_id(-1);
		FileController.saveUserDatabase();
	}

	public static User getUser(String tel) {
		for (User user : Database.registeredUsers) {
			if (user.getTel().equals(tel)) {
				return user;
			}
		}
		return null;
	}

	public static void addUser(int id, int location_id, String tel, String username) throws Exception {
		User user = new User(tel, username);
		user.setId(id);
		user.setLocation_id(location_id);
		Database.registeredUsers.add(user);
	}

	public static User addUser(String tel, String username) throws Exception {
		User user = new User(tel, username);
		Database.registeredUsers.add(user);
		FileController.saveUserDatabase();
		return user;
	}
	
	public static int getLatestID() {
		return Database.registeredUsers.size();
	}


}
