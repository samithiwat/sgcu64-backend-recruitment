package util;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;

import application.Database;
import controller.LocationController;
import controller.UserController;
import models.Location;
import models.User;

public class FileController {
	
	public static String regex = "==";
	
	public static void loadUserDatabase() throws Exception {
		FileReader fileReader = new FileReader("./userDatabase.txt");
		BufferedReader buffReader = new BufferedReader(fileReader);
		while (buffReader.ready()) {
			String line = buffReader.readLine();
			String[] userInfo = line.split(regex);
			UserController.addUser(Integer.parseInt(userInfo[0]),Integer.parseInt(userInfo[1]),userInfo[2],userInfo[3]);
		}
		fileReader.close();
	}
	
	public static void saveUserDatabase() throws Exception {
		FileWriter fileWriter = new  FileWriter("./userDatabase.txt");
		for(User user : Database.registeredUsers) {
			fileWriter.write(user.getId()+regex+user.getLocation_id()+regex+user.getTel()+regex+user.getUsername()+"\n");
		}
		fileWriter.close();
	}
	
	public static void loadLocationDatabase() throws Exception{
		FileReader fileReader = new FileReader("./locationDatabase.txt");
		BufferedReader buffReader = new BufferedReader(fileReader);
		while (buffReader.ready()) {
			String line = buffReader.readLine();
			String[] locationInfo = line.split(regex);
			LocationController.addLocation(Integer.parseInt(locationInfo[0]),locationInfo[1]);
		}
		fileReader.close();
	}
	
	public static void saveLocationDatabase() throws Exception{
		FileWriter fileWriter = new FileWriter("./locationDatabase.txt");
		for(Location location : Database.checkedInLocations) {
			fileWriter.write(location.getId()+regex+location.getName()+"\n");
		}
		fileWriter.close();
	}
}
