package net.leoshihpsu.warcaby;

import android.util.Log;

public class Game {

    private int[][] table;
    private int whiteCount;
    private int blackCount;
    private int turn;
    private int[] forcedAttackPosition;

    public final static int NONE = 0;
    public final static int WHITE = 1;
    public final static int BLACK = -1;
    public final static int STAY = 0;
    public final static int MOVE = 1;
    public final static int ATTACK = 2;
    public final static int CONTINUE_ATTACK = 3;
    public final static int NE = 0, NW = 1, SE = 2, SW = 3;

    public Game() {
        forcedAttackPosition = new int[]{0, 0};
        turn = WHITE;
        whiteCount = 12;
        blackCount = 12;
    }

    public int[][] create() {
        table = new int[8][8];
        for (int i = 0; i < 64; i++) {
            if (((i / 8) == 0) && (i % 2 != 0) || ((i / 8) == 1) && (i % 2 == 0) || ((i / 8) == 2) && (i % 2 != 0)) {
                table[i / 8][i % 8] = WHITE;
            } else if (((i / 8) == 6) && (i % 2 != 0) || ((i / 8) == 5) && (i % 2 == 0) || ((i / 8) == 7) && (i % 2 == 0)) {
                table[i / 8][i % 8] = BLACK;
            } else {
                table[i / 8][i % 8] = NONE;
            }
        }
        return table;
    }

    public void move(int[] selected, int[] target) {
        int allowed = isAllowed(selected, target);
        Log.d("allowed", String.valueOf(allowed));
        if (allowed == MOVE) {
            table[selected[0]][selected[1]] = NONE;
            table[target[0]][target[1]] = turn;
            turn = -turn;
        } else if (allowed == ATTACK) {
            table[selected[0]][selected[1]] = NONE;
            table[target[0]][target[1]] = turn;
            table[selected[0] + (target[0] - selected[0]) / 2][selected[1] + (target[1] - selected[1]) / 2] = NONE;
            if (turn == WHITE) {
                blackCount--;
            } else if (turn == BLACK) {
                whiteCount--;
            }
            turn = -turn;
        } else if (allowed == CONTINUE_ATTACK) {
            table[selected[0]][selected[1]] = NONE;
            table[target[0]][target[1]] = turn;
            table[selected[0] + (target[0] - selected[0]) / 2][selected[1] + (target[1] - selected[1]) / 2] = NONE;
            if (turn == WHITE) {
                blackCount--;
            } else if (turn == BLACK) {
                whiteCount--;
            }
        }
    }

    public int isAllowed(int[] selected, int[] target) {
        if (Math.abs(table[selected[0]][selected[1]]) == 1) {
            for (int i = 0; i < table.length; i++) {
                for (int j = 0; j < table.length; j++) {
                    if (table[i][j] == turn) {
                        int[] isA = isAttack(i, j);
                        Log.d(String.valueOf(turn)+":"+i+","+j, "ne:"+isA[NE]+" nw:"+isA[NW]+" se:"+isA[SE]+" sw:"+isA[SW]);
                        Log.d("selected", selected[0]+","+selected[1]);
                        Log.d("target", target[0]+","+target[1]);
                        if (selected[0] == i && selected[1] == j && target[0] - selected[0] == -2 && target[1] - selected[1] == 2) {
                            Log.d("outer","ok");

                            if (isA[NE] >= isA[NW] && isA[NE] >= isA[SE] && isA[NE] >= isA[SW]) {
                                Log.d("inner","ok");
                                if (isA[NE] == 1) {
                                    return ATTACK;
                                } else if (isA[NE] > 1) {
                                    return CONTINUE_ATTACK;
                                }
                            }
                        }
                        if (selected[0] == i && selected[1] == j && target[0] - selected[0] == -2 && target[1] - selected[1] == -2) {
                            if (isA[NW] >= isA[NE] && isA[NW] >= isA[SE] && isA[NW] >= isA[SW]) {
                                if (isA[NW] == 1) {
                                    return ATTACK;
                                } else if (isA[NW] > 1) {
                                    return CONTINUE_ATTACK;
                                }
                            }
                        }
                        if (selected[0] == i && selected[1] == j && target[0] - selected[0] == 2 && target[1] - selected[1] == 2) {
                            if (isA[SE] >= isA[NE] && isA[SE] >= isA[NW] && isA[SE] >= isA[SW]) {
                                if (isA[SE] == 1) {
                                    Log.d(String.valueOf(turn), "attack");
                                    return ATTACK;
                                } else if (isA[SE] > 1) {
                                    return CONTINUE_ATTACK;
                                }
                            }
                        }
                        if (selected[0] == i && selected[1] == j && target[0] - selected[0] == 2 && target[1] - selected[1] == -2) {
                            if (isA[SW] >= isA[NE] && isA[SW] >= isA[NW] && isA[SW] >= isA[SE]) {
                                if (isA[SW] == 1) {
                                    return ATTACK;
                                } else if (isA[SW] > 1) {
                                    return CONTINUE_ATTACK;
                                }
                            }
                        }
                    }
                }
                }
            if (Math.abs(target[0] - selected[0]) == 1 && Math.abs(target[1] - selected[1]) == 1 && table[target[0]][target[1]] == NONE) {
                return MOVE;
            }

        }
        return STAY;
    }

    public int[] isAttack(int i, int j) {
        int[] result = new int[4];
        result[NE] = isAttackNE(i - 2, j + 2);
        result[NW] = isAttackNW(i - 2, j - 2);
        result[SE] = isAttackSE(i + 2, j + 2);
        result[SW] = isAttackSW(i + 2, j - 2);
        return result;
    }

    public int isAttackSE(int i, int j) {
        if (i < 6 && j < 6) {
            if (table[i + 1][j + 1] == -turn && table[i + 2][j + 2] == NONE) {
                Log.d(String.valueOf(-turn),"SE");
                return 1 + isAttackNE(i + 2, j + 2)  + isAttackSE(i + 2, j + 2) + isAttackSW(i + 2, j + 2);
            }
        }
        return 0;
    }

    public int isAttackSW(int i, int j) {
        if (i < 6 && j > 1) {
            if (table[i + 1][j - 1] == -turn && table[i + 2][j - 2] == NONE) {
                Log.d(String.valueOf(-turn),"SW");
                return 1 + isAttackNW(i + 2, j - 2) + isAttackSE(i + 2, j - 2) + isAttackSW(i + 2, j - 2);
            }
        }
        return 0;

    }

    public int isAttackNE(int i, int j) {
        if (i > 1 && j < 6) {
            if (table[i - 1][j + 1] == -turn && table[i - 2][j + 2] == NONE) {
                Log.d(String.valueOf(-turn),"NE");
                return 1 + isAttackNE(i - 2, j + 2) + isAttackNW(i - 2, j + 2) + isAttackSE(i - 2, j + 2) ;
            }
        }
        return 0;

    }

    public int isAttackNW(int i, int j) {
        if (i > 1 && j > 1) {
            if (table[i - 1][j - 1] == (-turn) && table[i - 2][j - 2] == NONE) {
                Log.d(String.valueOf(-turn),"NW");
                return 1 + isAttackNE(i - 2, j - 2) + isAttackNW(i - 2, j - 2) + isAttackSW(i - 2, j - 2);
            }
        }
        return 0;

    }

    public int getWhiteCount() {
        return whiteCount;
    }

    public int getBlackCount() {
        return blackCount;
    }

    public int getTurn() {
        return turn;
    }

}
