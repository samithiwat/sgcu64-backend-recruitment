package application;

import java.util.ArrayList;

import models.Location;
import models.User;
import util.FileController;

public class Database {

	public static ArrayList<User> registeredUsers = new ArrayList<User>();
	public static ArrayList<Location> checkedInLocations = new ArrayList<Location>();

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
