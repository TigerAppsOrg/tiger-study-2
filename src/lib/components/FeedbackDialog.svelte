<!-- 
    @component FeedbackDialog.svelte

    Dialog for providing feedback on the app.
    - Author: Joshua Lau '26
-->

<script lang="ts">
    import { feedbackDialogOpen } from "$lib/state";
    import * as Dialog from "$lib/components/ui/dialog";
    import { Textarea } from "$lib/components/ui/textarea";
    import Button from "./ui/button/button.svelte";
    import { toast } from "svelte-sonner";

    let feedback = "";
</script>

<Dialog.Root bind:open={$feedbackDialogOpen}>
    <Dialog.Content>
        <div class="flex flex-col h-full overflow-hidden">
            <div class="my-4">
                <h2 class="text-xl font-semibold">
                    Provide Anonymous Feedback
                </h2>
                <p class="text-slate-500 text-sm">
                    We'd love to hear your thoughts on how we can improve! If
                    you'd like a response, please include your email address in
                    the feedback. Thank you!
                </p>
            </div>

            <Textarea
                bind:value={feedback}
                class="focus-visible:ring-0 focus-visible:border-slate-300 resize-none"
                placeholder="Enter your feedback here" />
        </div>
        <Dialog.Footer>
            <Button
                variant="outline"
                on:click={() => feedbackDialogOpen.set(false)}>
                Cancel
            </Button>
            <Button
                on:click={() => {
                    // TODO - send feedback to backend
                    feedback = "";
                    feedbackDialogOpen.set(false);
                    toast.info("Thank you for your feedback!");
                }}>
                Submit
            </Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
