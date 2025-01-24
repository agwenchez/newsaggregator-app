<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ArticleController extends Controller
{


    //* Fetch all articles. Search articles by title or description. Filter by category, author and date
    public function index(Request $request)
    {
        $query = Article::query();
        $perPage = $request->input('per_page', 50);

        if ($request->has('category')) {
            $query->where('category', $request->input('category'));
        }

        if ($request->has('author')) {
            $query->where('author', $request->input('author'));
        }

        if ($request->has('source')) {
            $query->where('source', $request->input('source'));
        }

        // Date filter (start_date and end_date)
        if ($request->has('start_date') && $request->has('end_date')) {
            $query->whereBetween('publish_date', [
                $request->input('start_date'),
                $request->input('end_date')
            ]);
        }

        if ($request->has('search_term')) {
            $searchTerm = Str::lower($request->input('search_term'));
            $query->where(function ($q) use ($searchTerm) {
                $q->whereRaw('LOWER(title) LIKE ?', ["%{$searchTerm}%"])
                    ->orWhereRaw('LOWER(description) LIKE ?', ["%{$searchTerm}%"]);
            });
        }

        $articles = $query->paginate($perPage); // Paginate results

        return response()->json($articles, 200);
    }

    /**
     * Fetch articles based on the authenticated user's preferences.
     */
    public function fetchByPreference(Request $request)
    {
        try {
            $user = $request->user();

            if (!$user) {
                return response()->json(['message' => 'Unauthenticated user.'], 401);
            }

            $preferences = $user->preferences;

            $query = Article::query();

            if ($preferences) {
                // Apply preferences if they exist
                if ($preferences->source) {
                    $query->where('source', $preferences->source);
                }
                if ($preferences->category) {
                    $query->where('category', $preferences->category);
                }
                if ($preferences->author) {
                    $query->where('author', $preferences->author);
                }
            }

            // Apply additional filters from request
            if ($request->has('category')) {
                $query->where('category', $request->input('category'));
            }
            if ($request->has('author')) {
                $query->where('author', $request->input('author'));
            }
            if ($request->has('source')) {
                $query->where('source', $request->input('source'));
            }
            if ($request->has('start_date') && $request->has('end_date')) {
                $query->whereBetween('publish_date', [
                    $request->input('start_date'),
                    $request->input('end_date'),
                ]);
            }
            if ($request->has('search_term')) {
                $searchTerm = Str::lower($request->input('search_term'));
                $query->where(function ($q) use ($searchTerm) {
                    $q->whereRaw('LOWER(title) LIKE ?', ["%{$searchTerm}%"])
                        ->orWhereRaw('LOWER(description) LIKE ?', ["%{$searchTerm}%"]);
                });
            }

            // Paginate results
            $perPage = $request->input('per_page', 50);
            $articles = $query->paginate($perPage);

            return response()->json($articles, 200);
        } catch (\Exception $e) {
            \Log::error('Error fetching preferred articles: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to fetch preferred articles.'], 500);
        }
    }



    public function getAuthors(Request $request)
    {
        $authors = Article::select('author')
            ->distinct()
            ->get();

        return response()->json($authors, 200);
    }
}
