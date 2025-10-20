import { toast } from "react-toastify";

// 🔹 URL de base de ton backend local XAMPP
const API_URL = "https://sp-p6.com/bamba/netflix-backend";

/**
 * Inscription d'un nouvel utilisateur
 */
export const signup = async (name, email, password) => {
    try {
        const res = await fetch(`${API_URL}/register.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();
        if (data.success) {
            toast.success("Compte créé avec succès !");
            return true; // 🔹 Succès
        } else {
            toast.error(data.error || "Erreur lors de l'inscription");
            return false;
        }
    } catch (err) {
        console.error("Erreur signup :", err);
        toast.error("Erreur réseau");
        return false;
    }
};

/**
 * Connexion utilisateur
 */
export const login = async (email, password) => {
    try {
        const res = await fetch(`${API_URL}/login.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (data.success) {
            localStorage.setItem("userEmail", email);
            toast.success("Connecté avec succès !");
            return true; // 🔹 Succès
        } else {
            toast.error(data.error || "Email ou mot de passe incorrect");
            return false;
        }
    } catch (err) {
        console.error("Erreur login :", err);
        toast.error("Erreur réseau");
        return false;
    }
};

/**
 * Déconnexion
 */
export const logout = (redirectFn) => {
    localStorage.removeItem("userEmail");
    if (redirectFn) redirectFn(); // ✅ redirige vers /login
};

/**
 * Activation de l’abonnement (simule le paiement)
 */
export const activateSubscription = async (email) => {
    try {
        const res = await fetch(`${API_URL}/update_subscription.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, status: "active" })
        });

        const data = await res.json();
        if (data.success) {
            toast.success("Abonnement activé !");
            return true;
        } else {
            toast.error(data.error || "Erreur lors de l'activation");
            return false;
        }
    } catch (err) {
        console.error("Erreur activateSubscription :", err);
        toast.error("Erreur réseau");
        return false;
    }
};

/**
 * Vérifie si l’utilisateur est abonné
 */
export const checkSubscription = async (email) => {
    try {
        const res = await fetch(`${API_URL}/check_subscription.php?email=${email}`);
        const data = await res.json();
        return data.subscriptionStatus || "inactive";
    } catch (err) {
        console.error("Erreur checkSubscription :", err);
        return "inactive";
    }
};
