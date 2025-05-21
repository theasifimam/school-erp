import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { booksApi, issueBookApi } from "../../api/endpoints";
import { toast } from "sonner";

export const useBookstore = create(
  persist(
    (set, get) => ({
      books: [],
      issuedBooks: [],
      currentBook: null,
      isLoading: false,
      error: null,
      successMessage: null,

      // Fetch all books
      fetchBooks: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await booksApi.getAll();

          set({ books: data.data, isLoading: false });
        } catch (error) {
          if (error.status === 401) {
            // Handle unauthorized (token expired or invalid)
            set({
              error: "Session expired. Please login again.",
              isLoading: false,
            });
            // Optionally trigger logout here
          } else {
            set({
              error: error.info?.message || "Failed to fetch books",
              isLoading: false,
            });
          }
        }
      },

      searchBooks: async (searchQuery) => {
        set({ isLoading: true, error: null });
        try {
          const data = await booksApi.searchBooks(searchQuery);

          set({ books: data.data, isLoading: false });
        } catch (error) {
          if (error.status === 401) {
            // Handle unauthorized (token expired or invalid)
            set({
              error: "Session expired. Please login again.",
              isLoading: false,
            });
            // Optionally trigger logout here
          } else {
            set({
              error: error.info?.message || "Failed to fetch books",
              isLoading: false,
            });
          }
        }
      },

      // Fetch single book by ID
      fetchBook: async (id) => {
        set({ isLoading: true, error: null });
        try {
          const response = await booksApi.getById(id);
          set({
            currentBook: response.data,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error.response?.data?.message || "Failed to fetch Book",
            isLoading: false,
          });
        }
      },

      // Create new Book
      createBook: async (bookData) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
          const response = await booksApi.create(bookData);
          set((state) => ({
            books: [...state.books, response.data],
            isLoading: false,
            successMessage: "Book added successfully!",
          }));
          toast("Book information added!", {
            description: "Book has been added successfully.",
            action: {
              label: "X",
              onClick: () => console.log("remove"),
            },
          });
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Failed to create Book",
            isLoading: false,
          });
          throw error;
        }
      },

      // Update existing Book
      updateBook: async (id, formData) => {
        set({ isLoading: true, error: null, successMessage: null });
        console.log("Updating book with ID:", id);
        console.log("New book data:", formData);
        try {
          const response = await booksApi.update(id, formData);
          set((state) => ({
            books: state.books.map((book) =>
              book._id === id ? response.data : book
            ),
            currentBook: response.data,
            isLoading: false,
            successMessage: "Book updated successfully!",
          }));
          toast("Book information updated!", {
            description: "Book information has been updated successfully.",
            action: {
              label: "X",
              onClick: () => console.log("remove"),
            },
          });
        } catch (error) {
          set({
            error: error.response?.data?.message || "Failed to update Book",
            isLoading: false,
          });
          throw error;
        }
      },

      // Delete Book
      deleteBook: async (id) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
          await booksApi.delete(id);
          set((state) => ({
            books: state.books.filter((book) => book._id !== id),
            currentBook: null,
            isLoading: false,
            successMessage: "Book deleted successfully!",
          }));
        } catch (error) {
          set({
            error: error.response?.data?.message || "Failed to delete Book",
            isLoading: false,
          });
          throw error;
        }
      },

      issueBook: async (data) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
          const response = await issueBookApi.issueBook(data);
          set((state) => ({
            issuedBooks: [...state.books, response.data],
            isLoading: false,
            successMessage: "Book issued successfully!",
          }));
          toast("Book issued!", {
            description: "Book has been issued successfully.",
            action: {
              label: "X",
              onClick: () => console.log("remove"),
            },
          });
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Failed to issue Book",
            isLoading: false,
          });
          throw error;
        }
      },

      fetchIssuedBooks: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await issueBookApi.getAll();

          set({ issuedBooks: data, isLoading: false });
        } catch (error) {
          if (error.status === 401) {
            // Handle unauthorized (token expired or invalid)
            set({
              error: "Session expired. Please login again.",
              isLoading: false,
            });
            // Optionally trigger logout here
          } else {
            set({
              error: error.info?.message || "Failed to fetch books",
              isLoading: false,
            });
          }
        }
      },

      setCurrentBook: (book) => {
        set({ currentBook: book });
      },

      setBooks: (books) => {
        set({ books });
      },

      // Clear current Book
      clearCurrentBook: () => {
        set({ currentBook: null });
      },

      // Clear messages
      clearMessages: () => {
        set({ error: null, successMessage: null });
      },
    }),

    {
      name: "book-store",
      storage: createJSONStorage(() => sessionStorage), // Using sessionStorage instead of localStorage
      partialize: (state) => ({
        books: state.books,
        currentBook: state.currentBook,
      }),
    }
  )
);

// Utility functions for easier access
export const useBooks = () => useBookstore((state) => state.books);

export const useCurrentBook = () => useBookstore((state) => state.currentBook);

export const useBookLoading = () => useBookstore((state) => state.isLoading);

export const useBookError = () => useBookstore((state) => state.error);

export const useBookSuccess = () =>
  useBookstore((state) => state.successMessage);
