package Conexao;

import java.util.ArrayList;

public class Tratamento {
    String url_nome;
    double passo;
    double periodo;
    double t;
    int metodo;
    ArrayList<Blocos> caixa = new ArrayList<Blocos>();
    ArrayList<Ligacao> ligacao = new ArrayList<Ligacao>();
    String request_ip;
    String request_useragent;
    boolean vazio;
}

class Blocos {
    String id;
    String nome;
    double valor;
}
class Ligacao {
    String saida_id;
    String chegada_id;
    double valor;
}
