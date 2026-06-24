<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Upload\StoreDocumentRequest;
use App\Http\Requests\Upload\StoreImageRequest;
use App\Http\Resources\UploadResource;
use App\Models\Upload;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class UploadController extends Controller
{
    public function image(StoreImageRequest $request): JsonResponse
    {
        return $this->storeUpload(
            $request,
            $request->file('file'),
            'image',
            $request->string('category', 'product_image')->toString(),
            'uploads/images',
        );
    }

    public function document(StoreDocumentRequest $request): JsonResponse
    {
        return $this->storeUpload(
            $request,
            $request->file('file'),
            'document',
            $request->string('category', 'document')->toString(),
            'uploads/documents',
        );
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        $upload = Upload::query()->findOrFail($id);

        abort_unless((int) $upload->user_id === (int) $request->user()->id, Response::HTTP_FORBIDDEN);

        Storage::disk('public')->delete($upload->file_path);
        $upload->delete();

        return $this->successResponse(message: 'Upload deleted successfully.');
    }

    private function storeUpload(
        Request $request,
        UploadedFile $file,
        string $type,
        string $category,
        string $directory,
    ): JsonResponse {
        $storedPath = $file->storeAs(
            $directory,
            $this->storedFileName($file),
            'public',
        );

        $upload = Upload::create([
            'user_id' => $request->user()->id,
            'original_name' => $file->getClientOriginalName(),
            'file_name' => basename($storedPath),
            'file_path' => $storedPath,
            'file_type' => $type,
            'mime_type' => $file->getClientMimeType() ?: $file->getMimeType(),
            'file_size' => $file->getSize(),
            'category' => $category,
        ]);

        return $this->successResponse(
            UploadResource::make($upload)->resolve($request),
            status: Response::HTTP_CREATED,
        );
    }

    private function storedFileName(UploadedFile $file): string
    {
        $name = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $extension = strtolower($file->getClientOriginalExtension());

        return Str::slug($name).'-'.Str::uuid().'.'.$extension;
    }
}
