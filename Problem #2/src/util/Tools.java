package util;

public class Tools {
	public static boolean isNumberic(String str) {
		try {
			Long.parseLong(str);
		} catch (Exception e) {
			return false;
		}
		return true;
	}
}
