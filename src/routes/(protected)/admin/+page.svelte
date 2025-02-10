<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import AdminHeader from "./AdminHeader.svelte";

    let emailInput: HTMLInputElement;
    let emailError = "";
    let isSubmitting = false;

    // Validates email input
    function validateEmail(email: string): boolean {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    // Validates email input and sets error message if necessary
    function handleSubmit(event: SubmitEvent) {
        const email = emailInput.value.trim();

        emailError = "";

        if (!email) {
            emailError = "Email is required";
            event.preventDefault();
            return;
        }

        if (!validateEmail(email)) {
            emailError = "Please enter a valid email address";
            event.preventDefault();
            return;
        }

        isSubmitting = true;
    }
</script>

<svelte:head>
    <title>TigerStudy | Admin</title>
</svelte:head>

<div class="flex min-h-screen flex-col overflow-hidden">
    <AdminHeader />
    <div class="mx-auto max-w-2xl p-8">
        <h1 class="mb-6 text-2xl font-bold">Admin Controls</h1>

        <div class="space-y-6">
            <div class="rounded-lg border border-gray-200 p-4">
                <h2 class="mb-4 text-lg font-semibold">Test Email Sender</h2>
                <p class="mb-4 text-sm text-gray-600">
                    Send a test email to verify email functionality.
                </p>

                <form
                    method="POST"
                    action="?/email"
                    class="space-y-4"
                    on:submit={handleSubmit}
                    novalidate>
                    <div>
                        <input
                            bind:this={emailInput}
                            type="email"
                            name="emailAddress"
                            placeholder="Recipient's email address"
                            required
                            class="w-full rounded-md border {emailError
                                ? 'border-red-500'
                                : 'border-gray-300'} 
                            px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2
                            {emailError
                                ? 'focus:ring-red-500'
                                : 'focus:ring-blue-500'}" />
                        {#if emailError}
                            <p class="mt-1 text-sm text-red-500">
                                {emailError}
                            </p>
                        {/if}
                    </div>

                    <div class="relative">
                        <select name="emailType" required class="select-field">
                            <option value="" disabled selected
                                >Select email type</option>
                            <option value="welcome">Welcome Email</option>
                            <option value="feedback"
                                >Feedback Notification</option>
                            <option value="joined"
                                >Group Join Notification</option>
                        </select>
                        <div
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                            <svg
                                class="h-4 w-4 fill-current text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20">
                                <path
                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        class="w-full"
                        disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Test Email"}
                    </Button>
                </form>
            </div>
        </div>

        <div class="rounded-lg border border-gray-200 p-4">
            <h2 class="mb-4 text-lg font-semibold">Database Seeder</h2>
            <p class="mb-4 text-sm text-gray-600">
                Seed the database with initial data.
            </p>

            <form method="POST" action="?/seed" class="space-y-4">
                <Button type="submit" class="w-full">Seed Database</Button>
            </form>
        </div>
    </div>
</div>

<style lang="postcss">
    .select-field {
        @apply w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition-colors duration-200 ease-in-out hover:border-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500;
    }
</style>
