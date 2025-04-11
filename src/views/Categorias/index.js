import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
import CategoryIcon from "@material-ui/icons/Category";
import { makeStyles } from "@material-ui/core/styles";
import { abriCategoria } from "index";

const categoryData = {
  id: "Categorias",
  children: [
    { id: "Combos e Kits", icon: "🎁", i: "0" },
    { id: "SmartWatchs", icon: "⌚", i: "1" },
    { id: "Caixas De Som", icon: "🔊", i: "2" },
    { id: "Eletrônicos", icon: "📱", i: "3" },
    { id: "Salão e Barbearia", icon: "💇‍♂️", i: "4" },
    { id: "Automotivos", icon: "🚗", i: "5" },
    { id: "Videogame", icon: "🎮", i: "6" },
    { id: "Computador", icon: "💻", i: "7" },
    { id: "Ferramentas", icon: "🛠️", i: "8" },
    { id: "Brinquedos", icon: "🧸", i: "9" },
    { id: "Relógios", icon: "⏰", i: "10" },
    { id: "Headset e Fones", icon: "🎧", i: "11" },
    { id: "Luzes e Iluminação", icon: "💡", i: "12" },
    { id: "Câmeras", icon: "📷", i: "13" },
    { id: "Óculos", icon: "🕶️", i: "14" },
    { id: "Celulares", icon: "📱", i: "15" },
    { id: "Capinhas", icon: "📦", i: "16" },
    { id: "Piscinas", icon: "🏊‍♂️", i: "17" },
    { id: "Microfones", icon: "🎤", i: "18" },
    { id: "Petshop", icon: "🐶", i: "19" },
    { id: "TV e Acessórios", icon: "📺", i: "20" },
    { id: "Cabos", icon: "🔌", i: "21" },
    { id: "Roupas", icon: "👕", i: "22" },
    { id: "Boné e Chapéu", icon: "🧢", i: "23" },
    { id: "Calçados", icon: "👟", i: "24" },
    { id: "Roupa Infantil", icon: "🧒", i: "25" },
    { id: "Calçado Infantil", icon: "🥿", i: "26" },
    { id: "Bebê e Mamãe", icon: "👶", i: "27" },
    { id: "Cama, Mesa e Banho", icon: "🛏️", i: "28" },
    { id: "Saúde e Beleza", icon: "💅", i: "29" },
    { id: "Instrumentos Musicais", icon: "🎸", i: "30" },
    { id: "Móveis", icon: "🪑", i: "31" },
    { id: "Decoração", icon: "🖼️", i: "32" },
    { id: "Fantasia", icon: "🎭", i: "33" },
    { id: "Esportivos", icon: "⚽", i: "34" },
    { id: "Malas e Bolsas", icon: "🧳", i: "35" },
    { id: "Livraria e Papelaria", icon: "📚", i: "36" },
    { id: "Caça e Pesca", icon: "🎣", i: "37" },
    { id: "Agrorural", icon: "🌾", i: "38" },
    { id: "Alianças", icon: "💍", i: "39" },
    { id: "Bijuterias", icon: "📿", i: "40" },
    { id: "Piscinas", icon: "🏖️", i: "41" },
    { id: "Adaptadores", icon: "🧲", i: "42" },
    { id: "Inversores", icon: "🔁", i: "43" },
    { id: "Maquiagem", icon: "💄", i: "44" },
    { id: "Cosméticos", icon: "🧴", i: "45" },
    { id: "Perfumes", icon: "🌸", i: "46" },
    { id: "Drones", icon: "🛸", i: "47" },
    { id: "Ventiladores", icon: "🌀", i: "48" },
    { id: "Linha e Costura", icon: "🧵", i: "49" },
    { id: "Cozinha", icon: "🍳", i: "50" },
  ],
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 80,
    marginBottom: 20,
    padding: "6px",
    [theme.breakpoints.up("md")]: {
      paddingLeft: "60px",
      paddingRight: "60px",
      padding: "20px",
    },
    [theme.breakpoints.down("md")]: {
        paddingLeft: "20px",
        paddingRight: "20px",
        padding: "10px",
      },
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e0e0e0",
    borderRadius: "16px",
    textAlign: "center",
    transition:
      "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease, color 0.3s ease",
    color: "#060D51",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",

    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
      background: "#060D51",
      color: "#ffffff",
    },

    "& .MuiTypography-root": {
      fontWeight: 600,
      fontSize: "1rem",
      transition: "color 0.3s ease",
    },

    "& .MuiSvgIcon-root": {
      color: "#060D51",
      fontSize: "2rem",
      marginBottom: "8px",
      transition: "color 0.3s ease",
    },

    "&:hover .MuiSvgIcon-root": {
      color: "#ffffff",
    },
  },
  cardContent: {
    margin: '26px',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 150,
    transition: "all 0.3s ease",
  },
  icon: {
    fontSize: 46,
    marginBottom: 8,
  },
}));

const AnimatedCard = ({ category, onClick }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => onClick(category)}>
        <CardContent className={classes.cardContent}>
          <div className={classes.icon}>{category.icon}</div>
          <Typography variant="h6" align="center">
            {category.id}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const CategoryScreen = () => {
  const classes = useStyles();

  const handleCategoryClick = (category) => {
    // Lógica para tratar clique na categoria (ex: redirecionamento, modal, etc.)
    //alert(`Categoria selecionada: ${category.id}`);
    const idCategoria = Number(category.i);
    abriCategoria(idCategoria);
  };

  return (
    <Container className={classes.container}>
      <Grid container spacing={3}>
        {categoryData.children.map((category) => (
          <Grid item key={category.i} xs={6} sm={6} md={4}>
            {/* xs=12 para 1 coluna em dispositivos pequenos e md=4 para 3 colunas em dispositivos maiores */}
            <AnimatedCard category={category} onClick={handleCategoryClick} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategoryScreen;
