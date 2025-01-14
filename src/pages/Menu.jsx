import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import { menuService } from "../services/fakeApi";

const categories = [
  { label: "Entrées", value: "entrees" },
  { label: "Plats", value: "plats" },
  { label: "Desserts", value: "desserts" },
  { label: "Carte des Vins", value: "vins" },
];

function Menu() {
  const [currentTab, setCurrentTab] = useState(0);
  const [menuItems, setMenuItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      setLoading(true);
      const response = await menuService.getAll();
      setMenuItems(response.data);
      setError(null);
    } catch (err) {
      setError(
        "Erreur lors du chargement du menu. Veuillez réessayer plus tard."
      );
      console.error("Erreur:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h1"
          align="center"
          gutterBottom
          sx={{ fontFamily: "Playfair Display", mb: 6 }}
        >
          Notre Carte
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="menu categories"
            sx={{
              "& .MuiTab-root": {
                fontFamily: "Playfair Display",
                fontSize: "1.1rem",
              },
            }}
          >
            {categories.map((category, index) => (
              <Tab key={index} label={category.label} />
            ))}
          </Tabs>
        </Box>

        {categories.map((category, index) => (
          <Box
            key={index}
            role="tabpanel"
            hidden={currentTab !== index}
            sx={{ mt: 4 }}
          >
            {currentTab === index && (
              <Grid container spacing={4}>
                {menuItems[category.value]?.map((item, itemIndex) => (
                  <Grid item xs={12} key={item._id || itemIndex}>
                    <Card
                      elevation={0}
                      sx={{
                        backgroundColor: "transparent",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.02)",
                        },
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "baseline",
                            mb: 1,
                          }}
                        >
                          <Typography
                            variant="h6"
                            component="h3"
                            sx={{ fontFamily: "Playfair Display" }}
                          >
                            {item.nom}
                          </Typography>
                          <Typography
                            variant="h6"
                            component="span"
                            color="secondary"
                            sx={{ fontWeight: "bold" }}
                          >
                            {typeof item.prix === "number"
                              ? `${item.prix}€`
                              : item.prix}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{ fontStyle: "italic" }}
                        >
                          {item.description}
                        </Typography>
                        {item.allergenes && item.allergenes.length > 0 && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: "block", mt: 1 }}
                          >
                            Allergènes : {item.allergenes.join(", ")}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                    {itemIndex <
                      (menuItems[category.value]?.length || 0) - 1 && (
                      <Divider sx={{ my: 2 }} />
                    )}
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        ))}
      </Container>
    </Box>
  );
}

export default Menu;
