package Conexao;

import java.util.ArrayList;
import java.util.Collection;

public class Tratamento {
    public String url_nome;
    public double passo;
    public double periodo;
    public double t;
    public int metodo;
    public ArrayList<Blocos> caixa = new ArrayList<Blocos>();
    public ArrayList<Ligacao> ligacao = new ArrayList<Ligacao>();
}

class Blocos {
    public String id;
    public String nome;
    public double valor;
}
class Ligacao {
    public String saida_id;
    public String chegada_id;
    public double valor;
}
