package component;

import application.Database;

public class Location {
	private int id;
	private String name;
	
	public Location(String name) throws Exception {
		setId(Database.getLatestLocationID() + 1);
		setName(name);
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) throws Exception {
		if(name.length() < 5) {
			throw new Exception("The location name must more than 5 characters.");
		}
		this.name = name;
	}
	
	public int getNUsers(){
		int count = 0;
		for(User user : Database.registeredUsers) {
			if(user.getLocation_id() == id) {
				count++;
			}
		}
		return count;
	}
}
