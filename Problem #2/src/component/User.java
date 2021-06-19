package component;

import application.Database;

public class User {
	private int id;
	private int location_id;
	private String tel;
	private String username;

	public User(String tel,String username) throws Exception {
		setLocation_id(-1);
		setId(Database.getLatestUserID() + 1);
		setTel(tel);
		setUsername(username);
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getLocation_id() {
		return location_id;
	}
	
	public void setLocation_id(int location_id) {
		this.location_id = location_id;
	}
	
	public String getTel() {
		return tel;
	}

	public void setTel(String tel) throws Exception {
		if (tel.length() != 10)
			throw new Exception("Invalid input");
		this.tel = tel;
	}
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) throws Exception {
		if(username.length() < 5) {
			throw new Exception("Username must more than 5 character");
		}
		this.username = username;
	}

	public Location onLocation() {
		if(location_id>0) {
			return Database.checkedInLocations.get(location_id - 1);			
		}
		return null;
	}

}
