package controller;

import application.Database;
import models.Location;
import util.FileController;

public class LocationController {
	public static boolean isLocationExist(int id) {
		for (Location location : Database.checkedInLocations) {
			if (location.getId() == id) {
				return true;
			}
		}
		return false;
	}

	public static boolean isLocationExist(String name) {
		for (Location location : Database.checkedInLocations) {
			if (location.getName().equals(name)) {
				return true;
			}
		}
		return false;
	}

	public static void addLocation(int id, String name) throws Exception {
		Location location = new Location(name);
		location.setId(id);
		Database.checkedInLocations.add(location);
	}

	public static Location addLocation(String name) throws Exception {
		Location location = new Location(name);
		Database.checkedInLocations.add(location);
		FileController.saveLocationDatabase();
		return location;
	}
	
	public static int getLatestID() {
		return Database.checkedInLocations.size();
	}
}
