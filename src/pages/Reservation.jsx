import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { fr } from "date-fns/locale";
import { reservationService } from "../services/fakeApi";

function Reservation() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    nombrePersonnes: "",
    date: null,
    heure: null,
    demandesSpeciales: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date,
    }));
  };

  const handleTimeChange = (time) => {
    setFormData((prev) => ({
      ...prev,
      heure: time,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      // Formatage de l'heure
      const heureFormatee = formData.heure
        ? new Date(formData.heure).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        : null;

      // Préparation des données
      const reservationData = {
        ...formData,
        heure: heureFormatee,
      };

      // Envoi de la réservation
      const response = await reservationService.create(reservationData);

      setSnackbar({
        open: true,
        message: "Votre réservation a été enregistrée avec succès !",
        severity: "success",
      });

      // Réinitialiser le formulaire
      setFormData({
        nom: "",
        email: "",
        telephone: "",
        nombrePersonnes: "",
        date: null,
        heure: null,
        demandesSpeciales: "",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message:
          error.message || "Une erreur est survenue. Veuillez réessayer.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <Box sx={{ py: 8, bgcolor: "grey.50", minHeight: "100vh" }}>
      <Container maxWidth="md">
        <Typography
          variant="h2"
          component="h1"
          align="center"
          gutterBottom
          sx={{ fontFamily: "Playfair Display", mb: 6 }}
        >
          Réserver une table
        </Typography>

        <Paper elevation={3} sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Téléphone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Nombre de personnes</InputLabel>
                  <Select
                    name="nombrePersonnes"
                    value={formData.nombrePersonnes}
                    onChange={handleChange}
                    label="Nombre de personnes"
                    disabled={loading}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num} {num === 1 ? "personne" : "personnes"}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={fr}
                >
                  <DatePicker
                    label="Date"
                    value={formData.date}
                    onChange={handleDateChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        fullWidth
                        disabled={loading}
                      />
                    )}
                    minDate={new Date()}
                    disabled={loading}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} md={6}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={fr}
                >
                  <TimePicker
                    label="Heure"
                    value={formData.heure}
                    onChange={handleTimeChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        fullWidth
                        disabled={loading}
                      />
                    )}
                    minTime={new Date(0, 0, 0, 12)}
                    maxTime={new Date(0, 0, 0, 23)}
                    disabled={loading}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Demandes spéciales"
                  name="demandesSpeciales"
                  multiline
                  rows={4}
                  value={formData.demandesSpeciales}
                  onChange={handleChange}
                  placeholder="Allergies, préférences alimentaires, occasion spéciale..."
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  size="large"
                  fullWidth
                  disabled={loading}
                  sx={{ mt: 2 }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Confirmer la réservation"
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default Reservation;
