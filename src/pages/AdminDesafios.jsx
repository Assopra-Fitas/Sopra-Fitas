import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Target, 
  PlusCircle, 
  Trash2, 
  Coins, 
} from 'lucide-react';

const AdminDesafios = () => {
  const [titulo, setTitulo] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [recompensa, setRecompensa] = useState('');
  const [desafiosAtuais, setDesafiosAtuais] = useState([]);

  useEffect(() => {
    fetchDesafios();
  }, []);

  const fetchDesafios = async () => {
    // Busca os desafios da tabela específica de desafios globais
    const { data, error } = await supabase
      .from('missoes_globais') 
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Erro ao buscar desafios:", error.message);
    } else if (data) {
      setDesafiosAtuais(data);
    }
  };

  const lancarDesafio = async (e) => {
    e.preventDefault();
    if (!titulo || !objetivo || !recompensa) return alert("Preencha todos os campos!");

    const { error } = await supabase
      .from('missoes_globais')
      .insert([{ 
        titulo, 
        objetivo, 
        recompensa: parseInt(recompensa),
        tipo: 'mensal' 
      }]);

    if (error) {
      alert("Erro ao lançar: " + error.message);
    } else {
      alert("✅ DESAFIO LANÇADO NO TOPO DA HOME!");
      setTitulo(''); 
      setObjetivo(''); 
      setRecompensa('');
      fetchDesafios(); // Atualiza a lista lateral
    }
  };

  // FUNÇÃO PARA EXCLUIR O DESAFIO
  const deletarDesafio = async (id) => {
    if (!window.confirm("Remover este desafio da Home definitivamente?")) return;
    
    const { error } = await supabase
      .from('missoes_globais')
      .delete()
      .eq('id', id);

    if (error) {
      alert("Erro ao deletar: " + error.message);
    } else {
      fetchDesafios(); // Atualiza a lista após deletar
    }
  };

  return (
    <div style={containerStyle}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <Link to="/admin-dashboard" style={backLinkStyle}>
          <ArrowLeft size={18} /> Voltar ao Painel do GM
        </Link>

        <div style={headerStyle}>
          <Target color="#7209b7" size={40} />
          <h2 style={{ margin: 0, color: '#fff' }}>Lançar Desafios do Mês</h2>
        </div>

        <div style={gridStyle}>
          {/* FORMULÁRIO DE CADASTRO */}
          <form onSubmit={lancarDesafio} style={cardStyle}>
            <h3 style={{ color: '#7209b7', marginBottom: '20px' }}>Novo Desafio</h3>
            
            <label style={labelStyle}>Nome do Desafio</label>
            <input 
              style={inputStyle} 
              placeholder="Ex: Mestre do Shoryuken" 
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
            />

            <label style={labelStyle}>O que o player deve fazer?</label>
            <textarea 
              style={{...inputStyle, height: '80px', resize: 'none'}} 
              placeholder="Ex: Termine Street Fighter II no Hard sem usar continue."
              value={objetivo}
              onChange={e => setObjetivo(e.target.value)}
            />

            <label style={labelStyle}>Recompensa (Pontos)</label>
            <div style={{ position: 'relative' }}>
              <Coins size={16} style={iconInputStyle} />
              <input 
                type="number" 
                style={{...inputStyle, paddingLeft: '35px'}} 
                placeholder="500" 
                value={recompensa}
                onChange={e => setRecompensa(e.target.value)}
              />
            </div>

            <button type="submit" style={buttonStyle}>
              <PlusCircle size={20} /> LANÇAR AGORA
            </button>
          </form>

          {/* LISTA DE DESAFIOS ATIVOS (COM OPÇÃO DE EXCLUIR) */}
          <div style={cardStyle}>
            <h3 style={{ color: '#aaa', marginBottom: '20px' }}>Desafios no Ar</h3>
            {desafiosAtuais.length === 0 ? (
              <p style={{ color: '#444', textAlign: 'center' }}>Nenhum desafio ativo no momento.</p>
            ) : (
              desafiosAtuais.map(d => (
                <div key={d.id} style={itemStyle}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#fff' }}>{d.titulo}</div>
                    <div style={{ fontSize: '0.75rem', color: '#7209b7', fontWeight: 'bold' }}>+{d.recompensa} pts</div>
                  </div>
                  <button 
                    onClick={() => deletarDesafio(d.id)} 
                    style={deleteBtnStyle}
                    title="Excluir desafio"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ESTILOS (Mantidos e refinados)
const containerStyle = { minHeight: '100vh', background: '#0f0f0f', color: 'white', padding: '40px', fontFamily: 'Inter, sans-serif' };
const backLinkStyle = { display: 'flex', alignItems: 'center', gap: '8px', color: '#666', textDecoration: 'none', marginBottom: '20px', fontSize: '0.9rem' };
const headerStyle = { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px' };
const gridStyle = { display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px' };
const cardStyle = { background: '#161616', padding: '25px', borderRadius: '16px', border: '1px solid #252525' };
const labelStyle = { display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '8px', marginTop: '15px' };
const inputStyle = { width: '100%', background: '#1e1e1e', border: '1px solid #333', borderRadius: '8px', padding: '12px', color: 'white', outline: 'none', boxSizing: 'border-box' };
const iconInputStyle = { position: 'absolute', left: '12px', top: '15px', color: '#fca311' };
const buttonStyle = { width: '100%', marginTop: '25px', padding: '15px', background: '#7209b7', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' };
const itemStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: '#1e1e1e', borderRadius: '8px', marginBottom: '12px', border: '1px solid #333' };

const deleteBtnStyle = { 
  background: 'rgba(255, 68, 68, 0.1)', 
  border: '1px solid rgba(255, 68, 68, 0.2)', 
  color: '#ff4444', 
  cursor: 'pointer',
  padding: '8px',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: '0.2s',
  marginLeft: '10px'
};

export default AdminDesafios;