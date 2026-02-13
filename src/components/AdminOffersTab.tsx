import { useState } from "react";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Offer, addOffer, updateOffer, deleteOffer } from "@/lib/offers";
import { useToast } from "@/hooks/use-toast";

interface AdminOffersTabProps {
  offers: Offer[];
  onRefresh: () => void;
}

const emptyForm = { title: "", subtitle: "", description: "", imageUrl: "", validUntil: "", terms: "", promoCode: "", promoDiscount: "" };

const AdminOffersTab = ({ offers, onRefresh }: AdminOffersTabProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const { toast } = useToast();

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (offer: Offer) => {
    setEditingId(offer.id);
    setForm({
      title: offer.title,
      subtitle: offer.subtitle,
      description: offer.description,
      imageUrl: offer.imageUrl,
      validUntil: offer.validUntil,
      terms: offer.terms,
      promoCode: offer.promoCode || "",
      promoDiscount: offer.promoDiscount ? String(offer.promoDiscount) : "",
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }
    const payload = {
      ...form,
      promoDiscount: form.promoDiscount ? Number(form.promoDiscount) : undefined,
      promoCode: form.promoCode.trim().toUpperCase() || undefined,
    };
    if (editingId) {
      updateOffer(editingId, payload);
      toast({ title: "Offer updated" });
    } else {
      addOffer(payload as Omit<Offer, 'id'>);
      toast({ title: "Offer added" });
    }
    setDialogOpen(false);
    onRefresh();
  };

  const handleDelete = (id: string) => {
    deleteOffer(id);
    toast({ title: "Offer deleted" });
    onRefresh();
  };

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-muted-foreground">{offers.length} offer(s)</p>
        <Button onClick={openNew} className="gap-2">
          <Plus className="w-4 h-4" /> Add Offer
        </Button>
      </div>

      {offers.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">No offers yet.</p>
          <Button onClick={openNew}>Create your first offer</Button>
        </div>
      ) : (
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Title</TableHead>
                <TableHead>Subtitle</TableHead>
                <TableHead>Promo Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offers.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell className="font-medium">{offer.title}</TableCell>
                  <TableCell className="text-muted-foreground">{offer.subtitle}</TableCell>
                  <TableCell className="font-mono text-sm">{offer.promoCode || "—"}</TableCell>
                  <TableCell className="text-muted-foreground">{offer.promoDiscount ? `${offer.promoDiscount}%` : "—"}</TableCell>
                  <TableCell className="text-muted-foreground">{offer.validUntil || "—"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(offer)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Offer</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete "{offer.title}".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(offer.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Offer" : "Add New Offer"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input id="title" value={form.title} onChange={e => updateField("title", e.target.value)} placeholder="e.g. Extended Stay Retreat" />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input id="subtitle" value={form.subtitle} onChange={e => updateField("subtitle", e.target.value)} placeholder="e.g. Stay 5 nights, pay for 4" />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={form.description} onChange={e => updateField("description", e.target.value)} placeholder="Describe the offer..." rows={3} />
            </div>
            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input id="imageUrl" value={form.imageUrl} onChange={e => updateField("imageUrl", e.target.value)} placeholder="https://..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="promoCode">Promo Code</Label>
                <Input id="promoCode" value={form.promoCode} onChange={e => updateField("promoCode", e.target.value.toUpperCase())} placeholder="e.g. SUMMER20" className="font-mono" />
              </div>
              <div>
                <Label htmlFor="promoDiscount">Discount %</Label>
                <Input id="promoDiscount" type="number" min="0" max="100" value={form.promoDiscount} onChange={e => updateField("promoDiscount", e.target.value)} placeholder="e.g. 20" />
              </div>
            </div>
            <div>
              <Label htmlFor="validUntil">Valid Until</Label>
              <Input id="validUntil" value={form.validUntil} onChange={e => updateField("validUntil", e.target.value)} placeholder="e.g. March 31, 2025" />
            </div>
            <div>
              <Label htmlFor="terms">Terms</Label>
              <Input id="terms" value={form.terms} onChange={e => updateField("terms", e.target.value)} placeholder="e.g. Subject to availability" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              <X className="w-4 h-4 mr-1" /> Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-1" /> {editingId ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminOffersTab;
