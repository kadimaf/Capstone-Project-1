package com.cacodev.shalom.utils;

import java.util.HashSet;
import java.util.Random;
import java.util.Set;

public class MemberIdGenerator {
    private static final Random random = new Random();
    private static final Set<String> usedIds = new HashSet<>();

    public static String generateMemberId() {
        String memberId;
        do {
            String letters = generateRandomLetters(3);
            String numbers = generateRandomNumbers(5);
            memberId = letters + numbers;
        } while (usedIds.contains(memberId));

        usedIds.add(memberId);
        return memberId;
    }

    private static String generateRandomLetters(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            char letter = (char) ('A' + random.nextInt(26));
            sb.append(letter);
        }
        return sb.toString();
    }

    private static String generateRandomNumbers(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int digit = random.nextInt(10);
            sb.append(digit);
        }
        return sb.toString();
    }
}