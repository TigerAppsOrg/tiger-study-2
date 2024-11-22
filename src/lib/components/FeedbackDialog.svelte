<script lang="ts">
    import { feedbackDialogOpen } from "$lib/client/state.svelte";
    import * as Dialog from "$lib/components/ui/dialog";
    import { Textarea } from "$lib/components/ui/textarea";
    import Button from "./ui/button/button.svelte";
    import { toast } from "svelte-sonner";

    let feedback = $state("");

    const submitFeedback = async () => {
        // Feedback must be non-empty
        if (!feedback.trim()) {
            toast.error("Feedback cannot be empty!");
            return;
        }

        // Feedback must be less than 10000 characters
        if (feedback.length > 10000) {
            toast.error("Feedback must be less than 10,000 characters!");
            return;
        }

        await fetch("/api/feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: feedback })
        });

        feedback = "";
        feedbackDialogOpen.value = false;
        toast.info("Thank you for your feedback!");
    };
</script>

<Dialog.Root bind:open={feedbackDialogOpen.value}>
    <Dialog.Content>
        <div class="flex h-full flex-col overflow-hidden">
            <div class="my-4">
                <h2 class="text-xl font-semibold">
                    Provide Anonymous Feedback
                </h2>
                <p class="text-sm text-slate-500">
                    We'd love to hear your thoughts on how we can improve! If
                    you'd like a response, please include your email address in
                    the feedback. Thank you!
                </p>
            </div>

            <Textarea
                bind:value={feedback}
                rows={6}
                class="resize-none focus-visible:border-slate-300 focus-visible:ring-0"
                placeholder="Enter your feedback here" />
        </div>
        <Dialog.Footer>
            <Button
                variant="outline"
                onclick={() => (feedbackDialogOpen.value = false)}>
                Cancel
            </Button>
            <Button onclick={submitFeedback}>Submit</Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
