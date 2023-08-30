// Import library yang dibutuhkan
import { useState } from 'react';
import './App.css';

// Komponen Square merepresentasikan kotak pada papan permainan
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Komponen Board merepresentasikan papan permainan secara keseluruhan
function Board({ xIsNext, squares, onPlay }) {
  // Fungsi ini dipanggil saat kotak pada papan ditekan
  function handleClick(i) {
    // Memeriksa apakah sudah ada pemenang atau kotak sudah terisi
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // Membuat salinan array squares untuk memodifikasi
    const nextSquares = squares.slice();
    // Menentukan apakah pemain selanjutnya adalah 'X' atau 'O'
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    // Memanggil fungsi onPlay untuk mengupdate state dengan langkah terbaru
    onPlay(nextSquares);
  }

  // Memeriksa apakah ada pemenang berdasarkan kondisi dari calculateWinner
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  // Fungsi ini dipanggil saat tombol "Restart" ditekan
  function handleRestart() {
    onPlay(Array(9).fill(null));
  }

  // Render tampilan papan permainan dan status
  return (
    <>
      <div className="status">{status}</div>
      <div className='board'>
        <div className="board-row">
          {/* Memanggil komponen Square untuk setiap kotak */}
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          {/* Memanggil komponen Square untuk setiap kotak */}
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          {/* Memanggil komponen Square untuk setiap kotak */}
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
      <button className='rest' onClick={handleRestart}>Restart</button>
    </>
  );
}

// Komponen Game mengatur permainan secara keseluruhan
export default function Game() {
  // Menggunakan state untuk melacak sejarah permainan dan langkah saat ini
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // Fungsi ini dipanggil saat kotak pada papan ditekan
  function handlePlay(nextSquares) {
    // Memperbarui sejarah dengan langkah baru dan langkah saat ini
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // Render tampilan permainan
  return (
    <div className="game">
      <div className="game-board">
        {/* Memanggil komponen Board dengan prop yang diperlukan */}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        {/* Menampilkan riwayat langkah (belum diimplementasikan) */}
      </div>
    </div>
  );
}

// Fungsi ini memeriksa apakah ada pemenang berdasarkan kondisi papan permainan
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
