package model.bean;

import java.util.ArrayList;

public class Registro {
  public String url_nome;
  public double passo;
  public double periodo;
  public double t;
  public int metodo;
  public ArrayList<Blocos> caixa = new ArrayList<Blocos>();
  public ArrayList<Ligacao> ligacao = new ArrayList<Ligacao>();
  public String request_ip;
  public String request_useragent;
  public boolean privado;
  public String usuario_id;
  public boolean vazio;
}