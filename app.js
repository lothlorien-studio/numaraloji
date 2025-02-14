import java.util.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class NumerologyAnalyzer {

    public static int calculateNumerology(String name) {
        name = name.toUpperCase();
        Map<Character, Integer> numerologyMap = new HashMap<>();
        numerologyMap.put('A', 1);
        numerologyMap.put('B', 2);
        numerologyMap.put('C', 3);
        numerologyMap.put('D', 4);
        numerologyMap.put('E', 5);
        numerologyMap.put('F', 6);
        numerologyMap.put('G', 7);
        numerologyMap.put('H', 8);
        numerologyMap.put('I', 9);
        numerologyMap.put('J', 1);
        numerologyMap.put('K', 2);
        numerologyMap.put('L', 3);
        numerologyMap.put('M', 4);
        numerologyMap.put('N', 5);
        numerologyMap.put('O', 6);
        numerologyMap.put('P', 7);
        numerologyMap.put('Q', 8);
        numerologyMap.put('R', 9);
        numerologyMap.put('S', 1);
        numerologyMap.put('T', 2);
        numerologyMap.put('U', 3);
        numerologyMap.put('V', 4);
        numerologyMap.put('W', 5);
        numerologyMap.put('X', 6);
        numerologyMap.put('Y', 7);
        numerologyMap.put('Z', 8);

        int total = 0;
        for (char c : name.toCharArray()) {
            if (Character.isLetter(c)) {
                total += numerologyMap.getOrDefault(c, 0);
            }
        }

        while (total > 9 && total != 11 && total != 22 && total != 33) {
            int sum = 0;
            int num = total;
            while (num > 0) {
                sum += num % 10;
                num /= 10;
            }
            total = sum;
        }
        return total;
    }

    public static String getZodiacSign(int day, int month) {
        int[] cutoffs = {120, 219, 320, 420, 521, 621, 722, 823, 923, 1023, 1122, 1222, 1231};
        String[] signs = {"O�lak", "Kova", "Bal�k", "Ko�", "Bo�a", "�kizler", "Yenge�", "Aslan", "Ba�ak", "Terazi", "Akrep", "Yay", "O�lak"};
        
        int dateNumber = month * 100 + day;
        for (int i = 0; i < cutoffs.length; i++) {
            if (dateNumber <= cutoffs[i]) {
                return signs[i];
            }
        }
        return "O�lak";
    }

    public static Map.Entry<String, Integer> getPlanetAndLuckyNumber(String zodiac) {
        Map<String, Map.Entry<String, Integer>> zodiacData = new HashMap<>();
        zodiacData.put("Ko�", new AbstractMap.SimpleEntry<>("Mars", 9));
        zodiacData.put("Bo�a", new AbstractMap.SimpleEntry<>("Ven�s", 6));
        zodiacData.put("�kizler", new AbstractMap.SimpleEntry<>("Merk�r", 5));
        zodiacData.put("Yenge�", new AbstractMap.SimpleEntry<>("Ay", 2));
        zodiacData.put("Aslan", new AbstractMap.SimpleEntry<>("G�ne�", 1));
        zodiacData.put("Ba�ak", new AbstractMap.SimpleEntry<>("Merk�r", 5));
        zodiacData.put("Terazi", new AbstractMap.SimpleEntry<>("Ven�s", 6));
        zodiacData.put("Akrep", new AbstractMap.SimpleEntry<>("Mars", 9));
        zodiacData.put("Yay", new AbstractMap.SimpleEntry<>("J�piter", 3));
        zodiacData.put("O�lak", new AbstractMap.SimpleEntry<>("Sat�rn", 8));
        zodiacData.put("Kova", new AbstractMap.SimpleEntry<>("Uran�s", 4));
        zodiacData.put("Bal�k", new AbstractMap.SimpleEntry<>("Nept�n", 7));

        return zodiacData.getOrDefault(zodiac, new AbstractMap.SimpleEntry<>("Bilinmiyor", 0));
    }

    public static List<String> suggestNaturalStones(int numerology, String zodiac) {
        Map<Integer, List<String>> stoneData = new HashMap<>();
        stoneData.put(1, Arrays.asList("Elmas", "Yakut", "Kuvars"));
        stoneData.put(2, Arrays.asList("Ay Ta��", "�nci", "Akuamarin"));
        stoneData.put(3, Arrays.asList("Ametist", "Turmalin", "Topaz"));
        stoneData.put(4, Arrays.asList("Kehribar", "Ye�im", "Obsidyen"));
        stoneData.put(5, Arrays.asList("Turkuaz", "Akik", "Sitrin"));
        stoneData.put(6, Arrays.asList("Safir", "Z�mr�t", "Kuvars"));
        stoneData.put(7, Arrays.asList("Kiyanit", "Lapis Lazuli", "Florit"));
        stoneData.put(8, Arrays.asList("Oniks", "Kaplan G�z�", "Hematit"));
        stoneData.put(9, Arrays.asList("Yakut", "Granat", "Rodonit"));

        Map<String, String> zodiacStones = new HashMap<>();
        zodiacStones.put("Ko�", "Yakut");
        zodiacStones.put("Bo�a", "Z�mr�t");
        zodiacStones.put("�kizler", "Akik");
        zodiacStones.put("Yenge�", "Ay Ta��");
        zodiacStones.put("Aslan", "Elmas");
        zodiacStones.put("Ba�ak", "Sitrin");
        zodiacStones.put("Terazi", "Safir");
        zodiacStones.put("Akrep", "Topaz");
        zodiacStones.put("Yay", "Turkuaz");
        zodiacStones.put("O�lak", "Oniks");
        zodiacStones.put("Kova", "Akuamarin");
        zodiacStones.put("Bal�k", "Ametist");

        List<String> stones = new ArrayList<>(stoneData.getOrDefault(numerology, new ArrayList<>()));
        String zodiacStone = zodiacStones.getOrDefault(zodiac, "");
        if (!zodiacStone.isEmpty() && !stones.contains(zodiacStone)) {
            stones.add(zodiacStone);
        }
        return stones.subList(0, Math.min(stones.size(), 3));
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Do�al Ta� ve Numeroloji Analizine Ho� Geldiniz!");
        System.out.print("Ad�n�z� girin: ");
        String name = scanner.nextLine().trim();
        System.out.print("Soyad�n�z� girin: ");
        String surname = scanner.nextLine().trim();
        System.out.print("Do�um tarihinizi (GG/AA/YYYY) format�nda girin: ");
        String birthDateInput = scanner.nextLine().trim();

        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            LocalDate birthDate = LocalDate.parse(birthDateInput, formatter);
            int day = birthDate.getDayOfMonth();
            int month = birthDate.getMonthValue();

            String fullName = name + " " + surname;
            int numerologyNumber = calculateNumerology(fullName);
            String zodiacSign = getZodiacSign(day, month);
            Map.Entry<String, Integer> planetAndLucky = getPlanetAndLuckyNumber(zodiacSign);
            String planet = planetAndLucky.getKey();
            int luckyNumber = planetAndLucky.getValue();
            List<String> stones = suggestNaturalStones(numerologyNumber, zodiacSign);

            System.out.println("\nAnaliz Sonu�lar�:");
            System.out.println("Ad Soyad: " + fullName);
            System.out.println("Do�um Tarihi: " + birthDateInput);
            System.out.println("Burcunuz: " + zodiacSign);
            System.out.println("�sim Numeroloji Say�s�: " + numerologyNumber);
            System.out.println("U�urlu Say�: " + luckyNumber);
            System.out.println("Gezegen: " + planet);
            System.out.println("�nerilen Do�al Ta�lar: " + String.join(", ", stones));

        } catch (DateTimeParseException e) {
            System.out.println("L�tfen ge�erli bir do�um tarihi format� girin (GG/AA/YYYY).");
        }
        scanner.close();
    }
}