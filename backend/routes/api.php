<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PreferenceController;
use Illuminate\Support\Facades\Route;

use App\Http\Middleware\CheckTokenExpiration;

// Public Routes
// Public Routes (no middleware)
Route::get('/v1/articles', [ArticleController::class, 'index']);
Route::post('/v1/auth/register', [AuthController::class, 'register']);
Route::post('/v1/auth/login', [AuthController::class, 'login']);
Route::get('/v1/authors', [ArticleController::class, 'getAuthors']);

// Protected Routes (with middleware)
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/v1/auth/user', [AuthController::class, 'user']);
    Route::post('/v1/auth/logout', [AuthController::class, 'logout']);

    // Preferences
    Route::get('/v1/preferences/{user_id}', [PreferenceController::class, 'index']);
    Route::post('/v1/preferences', [PreferenceController::class, 'store']);
    Route::put('/v1/preferences/{id}', [PreferenceController::class, 'update']);
    Route::delete('/v1/preferences/{id}', [PreferenceController::class, 'destroy']);

    // Fetch articles based on user preferences
    Route::get('/v1/articles/preferred', [ArticleController::class, 'fetchByPreference']);
});

