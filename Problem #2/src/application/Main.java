package application;

import java.util.Scanner;

import component.Location;
import component.User;

public class Main {

	public static boolean isClose = false;
	private static Scanner input = new Scanner(System.in);

	public static void main(String[] args) {
//		try {
//			Database.addUser("0922501231");
//			Database.addUser("0822371561");
//			Database.addUser("0912361274");
//			Database.addUser("0872241348");
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
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
		System.out.print("Please enter command : ");
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
			System.out.println(" Current at : Not check in yet");
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
			try {
				Database.addUserToLocation(user, location_id);
				System.out.println("-----------------------------------------");
				System.out.println("Successfully checked in!");
				System.out.println("Press ENTER to continue");
				input.nextLine();
			} catch (Exception e) {
				printErrorMessage(e.getMessage());
			}
		} else {
			try {
				int location_id = Integer.parseInt(command);
				if (Database.isLocationExist(location_id)) {
					try {
						Database.addUserToLocation(user, location_id);
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
		if (tel.length() < 10) {
			printErrorMessage("Invalid phone number");
			return false;
		}
		User user;
		if ((user = Database.getUser(tel)) == null) {
			try {
				System.out.println("-----------------------------------------");
				System.out.println("New one? registering...");
				System.out.print("Enter your username (more than 5 character) : ");
				user = Database.addUser(tel, input.nextLine());
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

	private static int registerLocation() {
		System.out.print("Enter location name to register : ");
		String name = input.nextLine();
		if (!Database.isLocationExist(name)) {
			try {
				Location location = Database.addLocation(name);
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

	private static void checkOutUser() {
		System.out.println("-----------------------------------------");
		System.out.println("Check Out");
		System.out.print("Enter your phone number : ");
		String tel = input.nextLine();
		User user;
		if ((user = Database.getUser(tel)) != null) {
			if (user.getLocation_id() != -1) {
				user.setLocation_id(-1);
				System.out.println("-----------------------------------------");
				System.out.println("Successfully check out, " + user.getUsername() + "!");
				System.out.println("Press ENTER to continue");
				input.nextLine();
			} else {
				System.out.println("-----------------------------------------");
				System.out.println("You aren't checked in any location yet.");
				System.out.println("Press ENTER to continue");
				input.nextLine();
			}
		} else {
			System.out.println("-----------------------------------------");
			printErrorMessage("Not found user");
			System.out.println("Press ENTER to continue");
			input.nextLine();
		}
	}

	private static void printPeopleCount() {
		if (Database.checkedInLocations.size() > 0) {
			System.out.println("-----------------------------------------");
			System.out.println("Current Population");
			for (Location location : Database.checkedInLocations) {
				System.out.println("  " + location.getId() + ". " + location.getName() + ": " + location.getNUsers());
			}
			System.out.println("Press ENTER to continue");
			input.nextLine();
		} else {
			System.out.println("-----------------------------------------");
			System.out.println("Not have any registered location yet.");
			System.out.println("Press ENTER to continue");
			input.nextLine();
		}
	}

	private static void searchUser() {
		System.out.print("Enter phone number : ");
		User user;
		if ((user = Database.getUser(input.nextLine())) != null) {
			printUserInfo(user);
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
