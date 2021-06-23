package application;

import java.util.Scanner;

import controller.LocationController;
import controller.UserController;
import models.Location;
import models.User;

public class Main {

	public static boolean isClose = false;
	private static Scanner input = new Scanner(System.in);

	public static void main(String[] args) {
		Database.migrate();
		while (!isClose) {
			printMainMenu();
			checkCommand(input.nextLine());
		}
	}

	private static void printMainMenu() {
		System.out.println("-----------------------------------------");
		System.out.println("Welcome to Chula Chana!!!");
		System.out.println("Avaliable commands:");
		System.out.println("  1. Check in user");
		System.out.println("  2. Check out user");
		System.out.println("  3. Print people count");
		System.out.println("  4. Search user via phone number");
		System.out.println("  type \"END\" to terminate program");
		System.out.print("Please enter command number: ");
	}

	private static void printErrorMessage(String errMessage) {
		System.out.println("\n===========================");
		System.out.println("\t***ERROR***");
		System.out.println(errMessage);
		System.out.println("Press ENTER to continue...\n===========================");
		input.nextLine();
	}

	private static String printLocationList() {
		System.out.println("-----------------------------------------");
		if (Database.checkedInLocations.size() > 0) {
			for (Location location : Database.checkedInLocations) {
				System.out.println("  " + location.getId() + ". " + location.getName());
			}
			System.out.println("  Enter \"ADD\" to register new location.");
			System.out.print("Enter select location : ");
			return input.nextLine();
		} else {
			System.out.println("Not have any checked in location yet.");
			System.out.println("Please enter location name to regitser new location.");
			return "ADD";
		}
	}

	private static void printUserInfo(User user) {
		System.out.println("-----------------------------------------");
		System.out.println("  Username : " + user.getUsername());
		System.out.println("  Phone Number : " + user.getTel());
		Location currentLocation;
		if ((currentLocation = user.onLocation()) != null) {
			System.out.println("  Current at : " + currentLocation.getName());
		} else {
			System.out.println("  Current at : Not check in yet");
		}
	}

	private static void checkCommand(String command) {
		switch (command.toUpperCase()) {
		case "1":
			checkInUser();
			break;
		case "2":
			checkOutUser();
			break;
		case "3":
			printPeopleCount();
			break;
		case "4":
			searchUser();
			break;
		case "END":
			isClose = true;
			break;
		default:
			printErrorMessage("Invalid command!");
			break;
		}
	}

	private static void checkInLocation(User user, String command) {
		if (command.toUpperCase().equals("ADD")) {
			int location_id = registerLocation();
			if (location_id > 0) {
				try {
					UserController.addUserToLocation(user, location_id);
					System.out.println("-----------------------------------------");
					System.out.println("Successfully checked in!");
					System.out.println("Press ENTER to continue");
					input.nextLine();
				} catch (Exception e) {
					printErrorMessage(e.getMessage());
				}
			}
		} else {
			try {
				int location_id = Integer.parseInt(command);
				if (LocationController.isLocationExist(location_id)) {
					try {
						UserController.addUserToLocation(user, location_id);
						System.out.println("-----------------------------------------");
						System.out.println("Successfully checked in!");
						System.out.println("Press ENTER to continue");
						input.nextLine();
					} catch (Exception e) {
						printErrorMessage(e.getMessage());
					}
				} else {
					System.out.println("-----------------------------------------");
					System.out.println("Not found location registering...");
					registerLocation();
					System.out.println("Press ENTER to continue");
					input.nextLine();
				}
			} catch (Exception e) {
				printErrorMessage("Invalid command");
			}
		}
	}

	private static boolean checkInUser() {
		System.out.println("-----------------------------------------");
		System.out.println("Check In");
		System.out.print("Enter your phone number : ");
		String tel = input.nextLine();
		try {
			if (User.checkValidTel(tel)) {
				User user;
				if ((user = UserController.getUser(tel)) == null) {
					try {
						System.out.println("-----------------------------------------");
						System.out.println("New one? registering...");
						System.out.print("Enter your username (more than 5 character) : ");
						user = UserController.addUser(tel, input.nextLine());
						System.out.println("Successfully registered");
					} catch (Exception e) {
						printErrorMessage(e.getMessage());
						return false;
					}
				} else {
					System.out.println("-----------------------------------------");
					System.out.println("Welcome back, " + user.getUsername());
				}
				String command = printLocationList();
				checkInLocation(user, command);
				return true;
			}
		} catch (Exception e) {
			printErrorMessage(e.getMessage());
			return false;
		}
		return true;
	}

	private static int registerLocation() {
		System.out.print("Enter location name to register (more than 5 character) : ");
		String name = input.nextLine();
		if (!LocationController.isLocationExist(name)) {
			try {
				Location location = LocationController.addLocation(name);
				return location.getId();
			} catch (Exception e) {
				printErrorMessage(e.getMessage());
				return -1;
			}
		} else {
			printErrorMessage("This location is already existed!");
			return -1;
		}
	}

	private static boolean checkOutUser() {
		System.out.println("-----------------------------------------");
		System.out.println("Check Out");
		System.out.print("Enter your phone number : ");
		String tel = input.nextLine();
		User user;
		if ((user = UserController.getUser(tel)) != null) {
			if (user.getLocation_id() != -1) {
				try {
					UserController.removeUserFromLocation(user);
				} catch (Exception e) {
					printErrorMessage(e.getMessage());
					return false;
				}
				System.out.println("-----------------------------------------");
				System.out.println("Successfully check out, " + user.getUsername() + "!");
				System.out.println("Press ENTER to continue");
				input.nextLine();
				return true;
			} else {
				System.out.println("-----------------------------------------");
				System.out.println("You aren't checked in any location yet.");
				System.out.println("Press ENTER to continue");
				input.nextLine();
				return false;
			}
		} else {
			System.out.println("-----------------------------------------");
			printErrorMessage("Not found user");
			System.out.println("Press ENTER to continue");
			input.nextLine();
			return false;
		}
	}

	private static void printPeopleCount() {
		if (Database.checkedInLocations.size() > 0) {
			System.out.println("-----------------------------------------");
			System.out.println("Current Population");
			for (Location location : Database.checkedInLocations) {
				System.out.println("  " + location.getId() + ". " + location.getName() + ": " + location.getNUsers());
			}
			System.out.println("-----------------------------------------");
			System.out.println("Press ENTER to continue");
			input.nextLine();
		} else {
			System.out.println("-----------------------------------------");
			System.out.println("Not have any registered location yet.");
			System.out.println("-----------------------------------------");
			System.out.println("Press ENTER to continue");
			input.nextLine();
		}
	}

	private static void searchUser() {
		System.out.print("Enter phone number : ");
		User user;
		if ((user = UserController.getUser(input.nextLine())) != null) {
			printUserInfo(user);
			System.out.println("-----------------------------------------");
			System.out.println("Press ENTER to continue");
			input.nextLine();
		} else {
			System.out.println("-----------------------------------------");
			System.out.println("Not found that user");
			System.out.println("Press ENTER to continue");
			input.nextLine();
		}
	}

}
