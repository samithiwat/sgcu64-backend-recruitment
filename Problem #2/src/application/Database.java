package application;

import java.util.ArrayList;

import component.Location;
import component.User;
import logic.FileController;

public class Database {

	public static ArrayList<User> registeredUsers = new ArrayList<User>();
	public static ArrayList<Location> checkedInLocations = new ArrayList<Location>();

	public static void addUserToLocation(User user, int location_id) throws Exception {
		user.setLocation_id(location_id);
		FileController.saveUserDatabase();
	}
	
	public static void removeUserFromLocation(User user) throws Exception {
		user.setLocation_id(-1);
		FileController.saveUserDatabase();
	}

	public static User getUser(String tel) {
		for (User user : registeredUsers) {
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
		registeredUsers.add(user);
	}

	public static User addUser(String tel, String username) throws Exception {
		User user = new User(tel, username);
		registeredUsers.add(user);
		FileController.saveUserDatabase();
		return user;
	}

	public static boolean isLocationExist(int id) {
		for (Location location : checkedInLocations) {
			if (location.getId() == id) {
				return true;
			}
		}
		return false;
	}

	public static boolean isLocationExist(String name) {
		for (Location location : checkedInLocations) {
			if (location.getName().equals(name)) {
				return true;
			}
		}
		return false;
	}

	public static void addLocation(int id, String name) throws Exception {
		Location location = new Location(name);
		location.setId(id);
		checkedInLocations.add(location);
	}

	public static Location addLocation(String name) throws Exception {
		Location location = new Location(name);
		checkedInLocations.add(location);
		FileController.saveLocationDatabase();
		return location;
	}

	public static int getLatestUserID() {
		return registeredUsers.size();
	}

	public static int getLatestLocationID() {
		return checkedInLocations.size();
	}

	public static void migrate() {
		// migrate User's Database
		try {
			FileController.loadUserDatabase();
		} catch (Exception e) {
			System.out.println("Not found User's Database creating new one...");
			try {
				FileController.saveUserDatabase();
			} catch (Exception e1) {
				e1.printStackTrace();
			}
		}

		// migrate Location's Database
		try {
			FileController.loadLocationDatabase();
		} catch (Exception e) {
			System.out.println("Not found Location's Database creating new one...");
			try {
				FileController.saveLocationDatabase();
			} catch (Exception e1) {
				e1.printStackTrace();
			}
		}
	}
}
